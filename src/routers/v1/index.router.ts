import express from "express";
import userRouter from "./user.router.js";
import pingRouter from "./ping.router.js";

const v1Router = express.Router();

v1Router.use("/v1", userRouter);
v1Router.use("/v1", pingRouter);

export default v1Router;
