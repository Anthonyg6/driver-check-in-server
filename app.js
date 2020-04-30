require("dotenv").config();
import express from "express";
import { json } from "body-parser";
import { connect } from "mongoose";

import cors from "cors";

import checkInRoutes from "./routes/checkIn";
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();
app.use(cors());

connect(MONGODB_URI)
  .then(() => {
    console.log("Connected To MongoDB");
  })
  .catch((error) => {
    console.log("What MongoDB am I supposed to connect too?");
    console.error(error);
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(json());
app.use("/check-in", checkInRoutes);
export default app;
