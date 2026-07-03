import type { Request, Response } from "express";

export const pingController = (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: "pong",
    error: {},
  });
};
