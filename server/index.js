import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";

console.log("Starting server initialization...");

import { auth } from "./src/config/auth.js";
console.log("Auth imported successfully");

import vehicleRouter from "./src/routes/vehicle.routes.js";
console.log("Vehicle router imported");
import driverRouter from "./src/routes/driver.routes.js";
console.log("Driver router imported");
import tripRouter from "./src/routes/trip.routes.js";
console.log("Trip router imported");
import maintenanceRouter from "./src/routes/maintenance.routes.js";
console.log("Maintenance router imported");
import financialRouter from "./src/routes/financial.routes.js";
console.log("Financial router imported");

dotenv.config();
console.log("Env config loaded");

const port = process.env.PORT;
const app = express();

console.log("Express app created");

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

console.log("CORS middleware applied");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.all("/api/auth/{*splat}", toNodeHandler(auth));

console.log("Basic middleware applied");

app.get("/api/health", (_req, res) => res.json({ success: true, message: "TransitOps API is running" }));
app.use("/api/vehicles", vehicleRouter);
app.use("/api/drivers", driverRouter);
app.use("/api/trips", tripRouter);
app.use("/api/maintenance", maintenanceRouter);
app.use("/api", financialRouter);

console.log("Routes configured");

app.use((error, _req, res, _next) => {
  console.error(error);
  const statusCode = error.statusCode || (error.code === "P2002" ? 409 : 500);
  const message = error.code === "P2002" ? "A record with this unique value already exists" : error.message || "Internal server error";
  res.status(statusCode).json({ success: false, statusCode, message, data: null });
});

console.log("Error handler configured");

// Handle unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

const server = app.listen(port || 3000, () => {
    console.log(`Server is running on http://localhost:${port || 3000}`)
});

console.log("Server listener configured");

// Prevent the process from exiting
// Keep at least one active handle
setInterval(() => {
  // This keeps the process alive
}, 30000);

console.log("Keep-alive handler set");

// Keep the server from exiting
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

// Log if the process is about to exit
process.on('exit', (code) => {
  console.log(`Process is exiting with code: ${code}`);
});
