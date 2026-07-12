import prisma from "../config/db.js";
import asyncHandler from "../utills/asyncHandler.js";
import apiError from "../utills/apiError.js";
import apiResponse from "../utills/apiResponse.js";

const validDate = (value, field) => {
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) throw new apiError(400, `${field} must be a valid date`);
  return date;
};
const createFuelLog = asyncHandler(async (req, res) => {
  let vehicleId = req.body.vehicleId;
  if (!vehicleId && req.body.vehicle) vehicleId = (await prisma.vehicle.findUnique({ where: { registrationNumber: req.body.vehicle }, select: { id: true } }))?.id;
  const liters = Number(req.body.liters), cost = Number(req.body.cost);
  if (!vehicleId || !Number.isFinite(liters) || liters <= 0 || !Number.isFinite(cost) || cost < 0) throw new apiError(400, "vehicleId, positive liters, and a valid cost are required");
  const log = await prisma.fuelLog.create({ data: { vehicleId, tripId: req.body.tripId || null, liters, cost, date: req.body.date ? validDate(req.body.date, "date") : undefined }, include: { vehicle: true, trip: true } });
  res.status(201).json(new apiResponse(201, log, "Fuel log created successfully"));
});
const getFuelLogs = asyncHandler(async (_req, res) => res.json(new apiResponse(200, await prisma.fuelLog.findMany({ include: { vehicle: true, trip: true }, orderBy: { date: "desc" } }), "Fuel logs fetched successfully")));
const createExpense = asyncHandler(async (req, res) => {
  let vehicleId = req.body.vehicleId;
  if (!vehicleId && req.body.vehicle) vehicleId = (await prisma.vehicle.findUnique({ where: { registrationNumber: req.body.vehicle }, select: { id: true } }))?.id;
  const amount = Number(req.body.amount ?? req.body.cost);
  const type = String(req.body.type || "").toUpperCase() === "PARKING" ? "OTHER" : String(req.body.type || "").toUpperCase();
  if (!vehicleId || !["FUEL", "MAINTENANCE", "TOLL", "OTHER"].includes(type) || !Number.isFinite(amount) || amount < 0) throw new apiError(400, "vehicleId, a valid expense type, and a valid amount are required");
  const expense = await prisma.expense.create({ data: { vehicleId, tripId: req.body.tripId || null, type, amount, notes: req.body.notes, date: req.body.date ? validDate(req.body.date, "date") : undefined }, include: { vehicle: true, trip: true } });
  res.status(201).json(new apiResponse(201, expense, "Expense created successfully"));
});
const getExpenses = asyncHandler(async (_req, res) => res.json(new apiResponse(200, await prisma.expense.findMany({ include: { vehicle: true, trip: true }, orderBy: { date: "desc" } }), "Expenses fetched successfully")));

const getDashboard = asyncHandler(async (_req, res) => {
  const [vehicleStatuses, driverStatuses, tripStatuses, recentTrips] = await Promise.all([
    prisma.vehicle.groupBy({ by: ["status"], _count: { _all: true } }),
    prisma.driver.groupBy({ by: ["status"], _count: { _all: true } }),
    prisma.trip.groupBy({ by: ["status"], _count: { _all: true } }),
    prisma.trip.findMany({ take: 10, orderBy: { createdAt: "desc" }, include: { vehicle: true, driver: true } }),
  ]);
  const map = (items) => Object.fromEntries(items.map(({ status, _count }) => [status, _count._all]));
  res.json(new apiResponse(200, { vehicles: map(vehicleStatuses), drivers: map(driverStatuses), trips: map(tripStatuses), recentTrips }, "Dashboard data fetched successfully"));
});

const getVehicleReport = asyncHandler(async (_req, res) => {
  const vehicles = await prisma.vehicle.findMany({ include: { trips: { where: { status: "COMPLETED" } }, fuelLogs: true, expenses: true, maintenanceLogs: true } });
  const data = vehicles.map((vehicle) => {
    const distanceKm = vehicle.trips.reduce((sum, trip) => sum + (trip.actualDistanceKm ?? trip.plannedDistanceKm), 0);
    const fuelLiters = vehicle.fuelLogs.reduce((sum, item) => sum + item.liters, 0);
    const fuelCost = vehicle.fuelLogs.reduce((sum, item) => sum + item.cost, 0);
    const maintenanceCost = vehicle.maintenanceLogs.reduce((sum, item) => sum + item.cost, 0) + vehicle.expenses.filter((item) => item.type === "MAINTENANCE").reduce((sum, item) => sum + item.amount, 0);
    return { vehicleId: vehicle.id, registrationNumber: vehicle.registrationNumber, distanceKm, fuelLiters, fuelEfficiencyKmPerLiter: fuelLiters ? distanceKm / fuelLiters : null, fuelCost, maintenanceCost, operationalCost: fuelCost + maintenanceCost, acquisitionCost: vehicle.acquisitionCost, completedTrips: vehicle.trips.length };
  });
  res.json(new apiResponse(200, data, "Vehicle report fetched successfully"));
});
export { createFuelLog, getFuelLogs, createExpense, getExpenses, getDashboard, getVehicleReport };
