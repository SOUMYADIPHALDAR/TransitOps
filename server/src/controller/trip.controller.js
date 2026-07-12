import prisma from "../config/db.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";

const createTrip = asyncHandler(async (req, res) => {
  const {
    source,
    destination,
    cargoWeightKg,
    plannedDistanceKm,
    vehicleId,
    driverId,
  } = req.body;

  if (
    !source ||
    !destination ||
    !cargoWeightKg ||
    !plannedDistanceKm ||
    !vehicleId ||
    !driverId
  ) {
    throw new apiError(400, "All fields are required");
  }

  const trip = await prisma.$transaction(async (tx) => {
    const vehicleUpdate = await tx.vehicle.updateMany({
      where: { id: vehicleId, status: "AVAILABLE" },
      data: { status: "ON_TRIP" },
    });

    if (vehicleUpdate.count === 0) {
      throw new apiError(400, "Vehicle is unavailable or does not exist");
    }

    const driverUpdate = await tx.driver.updateMany({
      where: { id: driverId, status: "AVAILABLE" },
      data: { status: "ON_TRIP" },
    });

    if (driverUpdate.count === 0) {
      throw new apiError(400, "Driver is unavailable or does not exist");
    }

    return tx.trip.create({
      data: {
        source,
        destination,
        cargoWeightKg,
        plannedDistanceKm,
        vehicleId,
        driverId,
        status: "DISPATCHED",
        dispatchedAt: new Date(),
      },
    });
  });

  return res
    .status(201)
    .json(new apiResponse(201, trip, "Trip created successfully"));
});

const completeTrip = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { endOdometer, actualDistanceKm, fuelConsumedLiters } = req.body;

  const trip = await prisma.$transaction(async (tx) => {
    const existingTrip = await tx.trip.findUnique({ where: { id } });

    if (!existingTrip) {
      throw new apiError(404, "Trip not found");
    }

    if (existingTrip.status !== "DISPATCHED") {
      throw new apiError(400, "Only dispatched trips can be completed");
    }

    if (endOdometer == null || endOdometer < 0) {
      throw new apiError(400, "A valid final odometer reading is required");
    }

    await tx.vehicle.update({
      where: { id: existingTrip.vehicleId },
      data: { odometer: endOdometer, status: "AVAILABLE" },
    });

    await tx.driver.update({
      where: { id: existingTrip.driverId },
      data: { status: "AVAILABLE" },
    });

    return tx.trip.update({
      where: { id },
      data: {
        endOdometer,
        actualDistanceKm,
        fuelConsumedLiters,
        status: "COMPLETED",
        completedAt: new Date(),
      },
    });
  });

  return res
    .status(200)
    .json(new apiResponse(200, trip, "Trip completed successfully"));
});

export { createTrip, completeTrip };
