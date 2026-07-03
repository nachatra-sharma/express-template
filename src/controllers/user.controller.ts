import type { Request, Response } from "express";

export const UserController = (req: Request, res: Response) => {
  console.log("req query param: ", req.query);
  console.log("req body", req.body);

  return res.status(200).json({
    success: true,
    message: "OK",
    error: {},
  });
};

export const UserInfoController = (req: Request, res: Response) => {
  console.log("url param: ", req.params);
  return res.status(200).json({
    success: true,
    message: "OK",
    error: {},
  });
};
