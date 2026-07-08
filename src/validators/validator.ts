import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodObject } from "zod";

export const validateRequestBody = (Schema: ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Not a valid request",
          error: {
            error: error.issues,
          },
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "Internal Server Error",
          error: {
            error: error,
          },
        });
      }
    }
  };
};

export const validateRequestParams = (schema: ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.params);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Invalid Request Params",
          error: {
            error: error.issues,
          },
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "Internal Server Error",
          error: {
            error: error,
          },
        });
      }
    }
  };
};

export const validateRequestQuery = (schema: ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.query);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Invalid Request Params",
          error: {
            error: error.issues,
          },
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "Internal Server Error",
          error: {
            error: error,
          },
        });
      }
    }
  };
};
