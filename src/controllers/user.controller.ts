import type { Request, Response } from "express";

export const UserController = (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: "OK",
    error: {},
  });
};
