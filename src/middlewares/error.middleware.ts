import type { NextFunction, Request, Response } from "express";
import type { GenericError } from "../utils/error.utils.js";

export const genericErrorHandler = (
  error: GenericError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return res.status(error.statusCode).json({
    success: false,
    message: error.message,
    data: {},
    error: {},
  });
};
