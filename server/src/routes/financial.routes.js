import { Router } from "express";
import { createExpense, createFuelLog, getDashboard, getExpenses, getFuelLogs, getVehicleReport } from "../controller/financial.controller.js";
const router = Router();
router.get("/dashboard", getDashboard);
router.get("/reports/vehicles", getVehicleReport);
router.route("/fuel-logs").get(getFuelLogs).post(createFuelLog);
router.route("/expenses").get(getExpenses).post(createExpense);
export default router;
