import express from "express";
import {
  UserController,
  UserInfoController,
} from "../../controllers/user.controller.js";
import { validateRequestBody } from "../../validators/validator.js";
import { userBodySchema } from "../../validators/user.validator.js";

const userRouter = express.Router();

userRouter.post("/user", validateRequestBody(userBodySchema), UserController);
userRouter.get("/user/:id", UserInfoController);

export default userRouter;
