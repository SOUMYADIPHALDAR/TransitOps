import { Router } from "express";
import { completeMaintenance, createMaintenance, getMaintenance } from "../controller/maintenance.controller.js";
const router = Router();
router.route("/").get(getMaintenance).post(createMaintenance);
router.post("/:id/complete", completeMaintenance);
export default router;
