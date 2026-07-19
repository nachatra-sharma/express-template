import type { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export const attachCorrelationIDMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const correlationId = uuidv4();
  console.log(correlationId);
  req.headers["x-correlation-id"] = correlationId;
  next();
};
