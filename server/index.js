import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./src/config/auth.js";
import vehicleRouter from "./src/routes/vehicle.routes.js";
import driverRouter from "./src/routes/driver.routes.js";
import tripRouter from "./src/routes/trip.routes.js";
import maintenanceRouter from "./src/routes/maintenance.routes.js";
import financialRouter from "./src/routes/financial.routes.js";

dotenv.config();
const port = process.env.PORT;
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.all("/api/auth/{*splat}", toNodeHandler(auth));

app.get("/api/health", (_req, res) => res.json({ success: true, message: "TransitOps API is running" }));
app.use("/api/vehicles", vehicleRouter);
app.use("/api/drivers", driverRouter);
app.use("/api/trips", tripRouter);
app.use("/api/maintenance", maintenanceRouter);
app.use("/api", financialRouter);

app.use((error, _req, res, _next) => {
  console.error(error);
  const statusCode = error.statusCode || (error.code === "P2002" ? 409 : 500);
  const message = error.code === "P2002" ? "A record with this unique value already exists" : error.message || "Internal server error";
  res.status(statusCode).json({ success: false, statusCode, message, data: null });
});

app.listen(port || 3000, () => {
    console.log(`Server is running on http://localhost:${port || 3000}`)
});
