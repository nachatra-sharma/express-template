import dotenv from "dotenv";
import { envSchema } from "../validators/env.validator.js";
import logger from "./logger.config.js";

type ServerConfigType = {
  PORT: number;
};

function loadEnv() {
  dotenv.config();
  const isPortExist = envSchema.safeParse(Number(process.env.PORT));

  if (!isPortExist.success) {
    throw new Error(isPortExist.error?.issues[0]?.message);
  } else {
    logger.info("Environment variable loaded successfully!");
    return isPortExist.data;
  }
}

const PORT = loadEnv();

export const ServerConfig: ServerConfigType = {
  PORT: PORT,
};
