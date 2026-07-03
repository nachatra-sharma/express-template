import express from "express";

const pingRouter = express.Router();

pingRouter.get("/ping", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "pong",
    error: {},
  });
});

export default pingRouter;
