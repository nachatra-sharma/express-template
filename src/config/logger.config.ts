import winston from "winston";

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: "DD-MM-YYYY hh:mm:ss" }),
    winston.format.json(),
    winston.format.printf(({ timestamp, message, level, ...data }) => {
      const output = { timestamp, message, level, data };
      return JSON.stringify(output);
    }),
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
