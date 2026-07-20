import type { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { asyncLocalStorage } from "../utils/helpers/helpers.utils.js";

export const attachCorrelationIDMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const correlationId = uuidv4();
  req.headers["x-correlation-id"] = correlationId;
  asyncLocalStorage.run({ correlationId: correlationId }, () => {
    next();
  });
};
