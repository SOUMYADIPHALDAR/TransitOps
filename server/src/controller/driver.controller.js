import asyncHandler from "../utils/asyncHandler";
import apiError from "../utils/apiError";
import apiResponse from "../utils/apiResponse";

const newDriver = asyncHandler(async (req, res) => {
  const {
    name,
    contactNumber,
    licenseNumber,
    licenseCategory,
    licenseExpiryDate,
  } = req.body;
  if (
    !name ||
    contactNumber ||
    licenseCategory ||
    licenseNumber ||
    licenseExpiryDate
  ) {
    throw new apiError(404, "All these fields are required");
  }

  const existingDriver = await prisma.driver.findUnique({
    where: { licenseNumber },
  });
  console.log(editDriver);

  if (existingDriver) {
    throw new apiError(404, "License already exists");
  }

  const createDriver = await prisma.driver.create({
    data: {
      name,
      contactNumber,
      licenseNumber,
      licenseCategory,
      licenseExpiryDate,
      createdAt: new Date(),
    },
  });

  return res
    .status(200)
    .json(
      new apiResponse(200, createDriver, "New driver created successfully"),
    );
});

const editDriver = asyncHandler(async (req, res) => {
  const { name, contactNumber } = req.body;
  const { id } = req.params;

  if (!name || !contactNumber) {
    throw new apiError(400, "All fields are requires");
  }

  const driver = await prisma.driver.findUnique({
    where: {
      id,
    },
  });

  if (!driver) {
    throw new apiError(404, "Driver doesn't exist");
  }

  const updateDriver = await prisma.driver.update({
    where: {
      id,
    },
    data: {
      name,
      contactNumber,
    },
  });

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        updateDriver,
        "Driver's information has been updated successfully",
      ),
    );
});

const deletDriver = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const driver = await prisma.driver.findUnique({
    where: {
      id,
    },
  });

  if (!driver) {
    throw new apiError(404, "Driver doesn't exist");
  }

  const deletedDriver = await prisma.driver.delete({
    where: {
      id,
    },
  });

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        deletedDriver,
        "Driver's information has been deleted successfully",
      ),
    );
});
