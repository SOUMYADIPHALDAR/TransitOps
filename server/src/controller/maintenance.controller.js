import prisma from "../config/db.js";
import asyncHandler from "../utills/asyncHandler.js";
import apiError from "../utills/apiError.js";
import apiResponse from "../utills/apiResponse.js";

const createMaintenance = asyncHandler(async (req, res) => {
  let { vehicleId } = req.body;
  if (!vehicleId && req.body.vehicle) vehicleId = (await prisma.vehicle.findUnique({ where: { registrationNumber: req.body.vehicle }, select: { id: true } }))?.id;
  const serviceType = req.body.serviceType ?? req.body.type;
  const description = req.body.description ?? req.body.notes;
  const cost = Number(req.body.cost ?? 0);
  if (!vehicleId || !serviceType || !Number.isFinite(cost) || cost < 0) throw new apiError(400, "vehicleId, serviceType, and a valid cost are required");
  const startedAt = req.body.startedAt ?? req.body.date;
  if (startedAt && Number.isNaN(new Date(startedAt).valueOf())) throw new apiError(400, "startedAt must be a valid date");
  const log = await prisma.$transaction(async (tx) => {
    const vehicle = await tx.vehicle.updateMany({ where: { id: vehicleId, status: "AVAILABLE" }, data: { status: "IN_SHOP" } });
    if (!vehicle.count) throw new apiError(409, "Vehicle is unavailable for maintenance");
    return tx.maintenanceLog.create({ data: { vehicleId, serviceType, description, cost, startedAt: startedAt ? new Date(startedAt) : undefined }, include: { vehicle: true } });
  });
  res.status(201).json(new apiResponse(201, log, "Maintenance record created successfully"));
});
const getMaintenance = asyncHandler(async (_req, res) => res.json(new apiResponse(200, await prisma.maintenanceLog.findMany({ include: { vehicle: true }, orderBy: { startedAt: "desc" } }), "Maintenance logs fetched successfully")));
const completeMaintenance = asyncHandler(async (req, res) => {
  const log = await prisma.$transaction(async (tx) => {
    const current = await tx.maintenanceLog.findUnique({ where: { id: req.params.id } });
    if (!current) throw new apiError(404, "Maintenance record not found");
    if (current.status !== "ACTIVE") throw new apiError(409, "Maintenance record is already closed");
    const updated = await tx.maintenanceLog.update({ where: { id: current.id }, data: { status: "CLOSED", completedAt: new Date() }, include: { vehicle: true } });
    const remaining = await tx.maintenanceLog.count({ where: { vehicleId: current.vehicleId, status: "ACTIVE" } });
    if (!remaining) await tx.vehicle.updateMany({ where: { id: current.vehicleId, status: "IN_SHOP" }, data: { status: "AVAILABLE" } });
    return updated;
  });
  res.json(new apiResponse(200, log, "Maintenance record completed successfully"));
});
export { createMaintenance, getMaintenance, completeMaintenance };
