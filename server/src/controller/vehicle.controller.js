import prisma from "../config/db";
import asyncHandler from "../utils/asyncHandler";
import apiError from "../utils/apiError";
import apiResponse from "../utils/apiResponse";

const newVehicle = asyncHandler(async (req, res) => {
  const {
    registrationNumber,
    name,
    type,
    maxLoadCapacityKg,
    odometer,
    acquisitionCost,
  } = req.body;

  if (
    !registrationNumber ||
    !name ||
    !type ||
    !maxLoadCapacityKg ||
    !odometer ||
    !acquisitionCost
  ) {
    throw new apiError(404, "All feilds are required");
  }

  const existingVehicle = await prisma.vehicle.findUnique({
    where: { registrationNumber },
  });

  if (existingVehicle) {
    throw new apiError(400, "Unauthorized access");
  }

  const createVehicle = await prisma.vehicle.create({
    data: {
      registrationNumber,
      name,
      type,
      maxLoadCapacityKg,
      odometer,
      acquisitionCost,
      createdAt: new Date(),
    },
  });

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        createVehicle,
        "New vehicle is created successfully",
      ),
    );
});


const getVehicle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const vehicle = await prisma.vehicle.findUnique({
    where: {
      id,
    },
    include: {
      registrationNumber,
      name,
      type,
      maxLoadCapacityKg,
      odometer,
      acquisitionCost,
    },
  });
  if (!vehicle) {
    throw new apiError(404, "No vehicle found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, vehicle, "Vehicle info has been fetched"));
});

const getAllVehicles = asyncHandler(async (req, res) => {
  const vehicles = await prisma.vehicle.findMany();
  if (vehicles.length == 0) {
    throw new apiError(404, "No vehicles has been found");
  }

  return res
    .status(200)
    .json(new apiResponse(200, vehicles, "All the vehicles has been fetched"));
});

const deleteVehicle = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const vehicle = await prisma.vehicle.findUnique({
    where: {
      id,
    },
  });

  if (!vehicle) {
    throw new apiError(404, "Vehicle not found");
  }

  await prisma.vehicle.delete({
    where: {
      id,
    },
  });

  return res
    .status(200)
    .json(new apiResponse(200, null, "Vehicle deleted successfully"));
});

export { newVehicle, editVehicle, getVehicle, getAllVehicles, deleteVehicle}
