import { Router } from "express";
import { createVehicle, deleteVehicle, getVehicle, getVehicles, updateVehicle } from "../controller/vehicle.controller.js";
const router = Router();
router.route("/").get(getVehicles).post(createVehicle);
router.route("/:id").get(getVehicle).patch(updateVehicle).delete(deleteVehicle);
export default router;
