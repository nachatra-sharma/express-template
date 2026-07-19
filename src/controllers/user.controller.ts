import type { NextFunction, Request, Response } from "express";
import fs from "fs/promises";
import { NotFoundError } from "../utils/error.utils.js";

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
