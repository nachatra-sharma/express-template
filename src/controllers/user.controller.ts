import type { NextFunction, Request, Response } from "express";
import fs from "fs/promises";
import {
  InternalServerError,
  NotFoundError,
  type GenericError,
} from "../utils/error.utils.js";

export const UserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("req query param: ", req.query);
  console.log("req body", req.body);
  try {
    await fs.readFile("./sample.txt");
    return res.status(200).json({
      success: true,
      message: "OK",
      error: {},
    });
  } catch (error) {
    throw new NotFoundError("the file was not found");
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
