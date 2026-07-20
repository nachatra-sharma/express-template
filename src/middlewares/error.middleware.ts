import type { NextFunction, Request, Response } from "express";
import type { GenericError } from "../utils/error.utils.js";
import logger from "../config/logger.config.js";

export const genericErrorHandler = (
  error: GenericError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!error.statusCode) {
    logger.error("Please check the logs and fix this issues", {
      data: {
        correlationID: req.headers["x-correlation-id"],
        error: error.message,
      },
    });
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: {},
      error: {},
    });
  } else {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
      data: {},
      error: {},
    });
  }
};
