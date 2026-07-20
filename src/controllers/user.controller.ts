import type { NextFunction, Request, Response } from "express";
import fs from "fs/promises";
import { NotFoundError } from "../utils/error.utils.js";
import logger from "../config/logger.config.js";

export const UserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await fs.readFile("./sample.txt");
    return res.status(200).json({
      success: true,
      message: "OK",
      error: {},
    });
  } catch (error) {
    logger.error("Something breaks inside usercontroller", {
      data: {
        correlationId: req.headers["x-correlation-id"],
        error: error,
      },
    });
    throw new NotFoundError("The file was not found");
  }
};

export const UserInfoController = (req: Request, res: Response) => {
  console.log("url param: ", req.params);
  return res.status(200).json({
    success: true,
    message: "OK",
    error: {},
  });
};
