import prisma from "../config/db.js";
import asyncHandler from "../utills/asyncHandler.js";
import apiError from "../utills/apiError.js";
import apiResponse from "../utills/apiResponse.js";

const number = (value, field, { min = 0 } = {}) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < min) throw new apiError(400, `${field} must be a valid number`);
  return parsed;
};

const vehicleData = (body, partial = false) => {
  const data = {};
  const name = body.name ?? body.vehicleName;
  const type = body.type ?? body.vehicleType;
  const capacity = body.maxLoadCapacityKg ?? body.maximumLoadCapacity;
  const fields = { registrationNumber: body.registrationNumber, name, type, region: body.region, status: body.status };
  for (const [key, value] of Object.entries(fields)) if (value !== undefined && value !== "") data[key] = key === "status" ? String(value).toUpperCase().replaceAll(" ", "_") : value;
  for (const [key, value] of Object.entries({ maxLoadCapacityKg: capacity, odometer: body.odometer, acquisitionCost: body.acquisitionCost })) {
    if (value !== undefined && value !== "") data[key] = number(value, key);
  }
  if (!partial) {
    for (const key of ["registrationNumber", "name", "type", "maxLoadCapacityKg", "odometer", "acquisitionCost"]) if (data[key] === undefined) throw new apiError(400, `${key} is required`);
  }
  return data;
};

const createVehicle = asyncHandler(async (req, res) => {
  const data = vehicleData(req.body);
  const vehicle = await prisma.vehicle.create({ data });
  res.status(201).json(new apiResponse(201, vehicle, "Vehicle created successfully"));
});

const getVehicles = asyncHandler(async (_req, res) => {
  const vehicles = await prisma.vehicle.findMany({ orderBy: { createdAt: "desc" } });
  res.json(new apiResponse(200, vehicles, "Vehicles fetched successfully"));
});

const getVehicle = asyncHandler(async (req, res) => {
  const vehicle = await prisma.vehicle.findUnique({ where: { id: req.params.id }, include: { trips: true, maintenanceLogs: true, fuelLogs: true, expenses: true } });
  if (!vehicle) throw new apiError(404, "Vehicle not found");
  res.json(new apiResponse(200, vehicle, "Vehicle fetched successfully"));
});

const updateVehicle = asyncHandler(async (req, res) => {
  const exists = await prisma.vehicle.findUnique({ where: { id: req.params.id } });
  if (!exists) throw new apiError(404, "Vehicle not found");
  const vehicle = await prisma.vehicle.update({ where: { id: req.params.id }, data: vehicleData(req.body, true) });
  res.json(new apiResponse(200, vehicle, "Vehicle updated successfully"));
});

const deleteVehicle = asyncHandler(async (req, res) => {
  const vehicle = await prisma.vehicle.findUnique({ where: { id: req.params.id }, include: { trips: { select: { id: true } }, maintenanceLogs: { select: { id: true } }, fuelLogs: { select: { id: true } }, expenses: { select: { id: true } } } });
  if (!vehicle) throw new apiError(404, "Vehicle not found");
  if (vehicle.trips.length || vehicle.maintenanceLogs.length || vehicle.fuelLogs.length || vehicle.expenses.length) throw new apiError(409, "A vehicle with operational records cannot be deleted");
  await prisma.vehicle.delete({ where: { id: req.params.id } });
  res.json(new apiResponse(200, null, "Vehicle deleted successfully"));
});

export { createVehicle, getVehicles, getVehicle, updateVehicle, deleteVehicle };
