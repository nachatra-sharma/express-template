import express from "express";
import { pingController } from "../../controllers/ping.controller.js";

const pingRouter = express.Router();

pingRouter.get("/ping", pingController);

export default pingRouter;
