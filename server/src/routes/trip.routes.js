import { Router } from "express";
import { cancelTrip, completeTrip, createTrip, dispatchTrip, getTrip, getTrips } from "../controller/trip.controller.js";
const router = Router();
router.route("/").get(getTrips).post(createTrip);
router.get("/:id", getTrip);
router.post("/:id/dispatch", dispatchTrip);
router.post("/:id/complete", completeTrip);
router.post("/:id/cancel", cancelTrip);
export default router;
