import express from "express";

const userRouter = express.Router();

userRouter.get("/user", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "OK",
    error: {},
  });
});

export default userRouter;
