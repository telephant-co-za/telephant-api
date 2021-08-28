import dotenv from "dotenv";
import mongoose from "mongoose";
var logger = require("../functions/logger");

dotenv.config();

// Connect to database
mongoose.connect(process.env.mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", (err) => {
  logger.error(`database connection error: ${err}`);
});
db.on("disconnected", () => {
  logger.warn("database disconnected");
});
db.once("open", () => {
  logger.info(`database connected to ${db.name} on ${db.host}`);
});
