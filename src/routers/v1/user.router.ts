import express from "express";
import {
  UserController,
  UserInfoController,
} from "../../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/user", UserController);
userRouter.get("/user/:id", UserInfoController);

export default userRouter;
