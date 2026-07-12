import prisma from "../config/db.js";
import asyncHandler from "../utills/asyncHandler.js";
import apiError from "../utills/apiError.js";
import apiResponse from "../utills/apiResponse.js";

const positive = (value, field) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) throw new apiError(400, `${field} must be greater than zero`);
  return parsed;
};
const tripInclude = { vehicle: true, driver: true };

const createTrip = asyncHandler(async (req, res) => {
  const { source, destination } = req.body;
  let { vehicleId, driverId } = req.body;
  if (!vehicleId && req.body.vehicle) {
    const registrationNumber = String(req.body.vehicle).split(" ")[0];
    vehicleId = (await prisma.vehicle.findUnique({ where: { registrationNumber }, select: { id: true } }))?.id;
  }
  if (!driverId && req.body.driver) driverId = (await prisma.driver.findFirst({ where: { name: req.body.driver }, select: { id: true } }))?.id;
  if (!source || !destination || !vehicleId || !driverId) throw new apiError(400, "source, destination, vehicleId, and driverId are required");
  const trip = await prisma.trip.create({ data: { source, destination, vehicleId, driverId, cargoWeightKg: positive(req.body.cargoWeightKg ?? req.body.cargoWeight, "cargoWeightKg"), plannedDistanceKm: positive(req.body.plannedDistanceKm ?? req.body.distance, "plannedDistanceKm") }, include: tripInclude });
  res.status(201).json(new apiResponse(201, trip, "Draft trip created successfully"));
});

const getTrips = asyncHandler(async (req, res) => {
  const where = req.query.status ? { status: String(req.query.status).toUpperCase() } : undefined;
  const trips = await prisma.trip.findMany({ where, include: tripInclude, orderBy: { createdAt: "desc" } });
  res.json(new apiResponse(200, trips, "Trips fetched successfully"));
});
const getTrip = asyncHandler(async (req, res) => {
  const trip = await prisma.trip.findUnique({ where: { id: req.params.id }, include: { ...tripInclude, fuelLogs: true, expenses: true } });
  if (!trip) throw new apiError(404, "Trip not found");
  res.json(new apiResponse(200, trip, "Trip fetched successfully"));
});

const dispatchTrip = asyncHandler(async (req, res) => {
  const trip = await prisma.$transaction(async (tx) => {
    const existing = await tx.trip.findUnique({ where: { id: req.params.id } });
    if (!existing) throw new apiError(404, "Trip not found");
    if (existing.status !== "DRAFT") throw new apiError(409, "Only draft trips can be dispatched");
    const vehicle = await tx.vehicle.updateMany({ where: { id: existing.vehicleId, status: "AVAILABLE" }, data: { status: "ON_TRIP" } });
    if (!vehicle.count) throw new apiError(409, "Vehicle is unavailable");
    const driver = await tx.driver.updateMany({ where: { id: existing.driverId, status: "AVAILABLE" }, data: { status: "ON_TRIP" } });
    if (!driver.count) throw new apiError(409, "Driver is unavailable");
    return tx.trip.update({ where: { id: existing.id }, data: { status: "DISPATCHED", dispatchedAt: new Date(), startOdometer: req.body.startOdometer === undefined ? undefined : positive(req.body.startOdometer, "startOdometer") }, include: tripInclude });
  });
  res.json(new apiResponse(200, trip, "Trip dispatched successfully"));
});

const completeTrip = asyncHandler(async (req, res) => {
  const trip = await prisma.$transaction(async (tx) => {
    const existing = await tx.trip.findUnique({ where: { id: req.params.id } });
    if (!existing) throw new apiError(404, "Trip not found");
    if (existing.status !== "DISPATCHED") throw new apiError(409, "Only dispatched trips can be completed");
    const endOdometer = positive(req.body.endOdometer, "endOdometer");
    if (existing.startOdometer !== null && endOdometer < existing.startOdometer) throw new apiError(400, "endOdometer cannot be lower than startOdometer");
    await tx.vehicle.update({ where: { id: existing.vehicleId }, data: { odometer: endOdometer, status: "AVAILABLE" } });
    await tx.driver.update({ where: { id: existing.driverId }, data: { status: "AVAILABLE" } });
    const data = { endOdometer, status: "COMPLETED", completedAt: new Date() };
    if (req.body.actualDistanceKm !== undefined) data.actualDistanceKm = positive(req.body.actualDistanceKm, "actualDistanceKm");
    if (req.body.fuelConsumedLiters !== undefined) data.fuelConsumedLiters = positive(req.body.fuelConsumedLiters, "fuelConsumedLiters");
    return tx.trip.update({ where: { id: existing.id }, data, include: tripInclude });
  });
  res.json(new apiResponse(200, trip, "Trip completed successfully"));
});

const cancelTrip = asyncHandler(async (req, res) => {
  const trip = await prisma.$transaction(async (tx) => {
    const existing = await tx.trip.findUnique({ where: { id: req.params.id } });
    if (!existing) throw new apiError(404, "Trip not found");
    if (!["DRAFT", "DISPATCHED"].includes(existing.status)) throw new apiError(409, "This trip cannot be cancelled");
    if (existing.status === "DISPATCHED") {
      await tx.vehicle.update({ where: { id: existing.vehicleId }, data: { status: "AVAILABLE" } });
      await tx.driver.update({ where: { id: existing.driverId }, data: { status: "AVAILABLE" } });
    }
    return tx.trip.update({ where: { id: existing.id }, data: { status: "CANCELLED", cancelledAt: new Date() }, include: tripInclude });
  });
  res.json(new apiResponse(200, trip, "Trip cancelled successfully"));
});
export { createTrip, getTrips, getTrip, dispatchTrip, completeTrip, cancelTrip };
