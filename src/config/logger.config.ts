import winston from "winston";
import { getCorrelationId } from "../utils/helpers/helpers.utils.js";

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
    winston.format.printf(({ timestamp, message, level, ...data }) => {
      const correlationID = getCorrelationId();
      const output = { timestamp, message, correlationID, level, data };
      return JSON.stringify(output);
    }),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/app.log",
    }),
  ],
});

export default logger;
