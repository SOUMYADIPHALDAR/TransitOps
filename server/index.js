import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./src/config/auth.js";

dotenv.config();
const port = process.env.PORT;
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.all("/", toNodeHandler(auth));
app.use(express.json);
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});
