import prisma from "../config/db.js";
import asyncHandler from "../utills/asyncHandler.js";
import apiError from "../utills/apiError.js";
import apiResponse from "../utills/apiResponse.js";

const driverData = (body, partial = false) => {
  const data = {};
  for (const key of ["name", "contactNumber", "licenseNumber", "licenseCategory", "userId"]) if (body[key] !== undefined && body[key] !== "") data[key] = body[key];
  if (body.licenseExpiryDate) {
    const date = new Date(body.licenseExpiryDate);
    if (Number.isNaN(date.valueOf())) throw new apiError(400, "licenseExpiryDate must be a valid date");
    data.licenseExpiryDate = date;
  }
  if (body.safetyScore !== undefined && body.safetyScore !== "") {
    const score = Number(body.safetyScore);
    if (!Number.isFinite(score) || score < 0 || score > 100) throw new apiError(400, "safetyScore must be between 0 and 100");
    data.safetyScore = score;
  }
  if (body.status) data.status = String(body.status).toUpperCase().replaceAll(" ", "_");
  if (!partial) for (const key of ["name", "contactNumber", "licenseNumber", "licenseCategory", "licenseExpiryDate"]) if (data[key] === undefined) throw new apiError(400, `${key} is required`);
  return data;
};

const createDriver = asyncHandler(async (req, res) => {
  const driver = await prisma.driver.create({ data: driverData(req.body) });
  res.status(201).json(new apiResponse(201, driver, "Driver created successfully"));
});
const getDrivers = asyncHandler(async (_req, res) => res.json(new apiResponse(200, await prisma.driver.findMany({ orderBy: { createdAt: "desc" } }), "Drivers fetched successfully")));
const getDriver = asyncHandler(async (req, res) => {
  const driver = await prisma.driver.findUnique({ where: { id: req.params.id }, include: { trips: true, user: { select: { id: true, email: true, name: true } } } });
  if (!driver) throw new apiError(404, "Driver not found");
  res.json(new apiResponse(200, driver, "Driver fetched successfully"));
});
const updateDriver = asyncHandler(async (req, res) => {
  const exists = await prisma.driver.findUnique({ where: { id: req.params.id } });
  if (!exists) throw new apiError(404, "Driver not found");
  const driver = await prisma.driver.update({ where: { id: req.params.id }, data: driverData(req.body, true) });
  res.json(new apiResponse(200, driver, "Driver updated successfully"));
});
const deleteDriver = asyncHandler(async (req, res) => {
  const driver = await prisma.driver.findUnique({ where: { id: req.params.id }, include: { trips: { select: { id: true } } } });
  if (!driver) throw new apiError(404, "Driver not found");
  if (driver.trips.length) throw new apiError(409, "A driver with trip records cannot be deleted");
  await prisma.driver.delete({ where: { id: req.params.id } });
  res.json(new apiResponse(200, null, "Driver deleted successfully"));
});
export { createDriver, getDrivers, getDriver, updateDriver, deleteDriver };
