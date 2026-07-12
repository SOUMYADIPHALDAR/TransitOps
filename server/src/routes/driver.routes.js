import { Router } from "express";
import { createDriver, deleteDriver, getDriver, getDrivers, updateDriver } from "../controller/driver.controller.js";
const router = Router();
router.route("/").get(getDrivers).post(createDriver);
router.route("/:id").get(getDriver).patch(updateDriver).delete(deleteDriver);
export default router;
