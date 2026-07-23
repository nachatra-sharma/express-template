import { envSchema } from "../validators/env.validator.js";
import logger from "./logger.config.js";

function loadEnv() {
  const parsedEnv = envSchema.safeParse({ PORT: process.env.PORT });

  if (!parsedEnv.success) {
    throw new Error("PORT: " + parsedEnv.error?.issues[0]?.message);
  } else {
    logger.info("Environment variable loaded successfully!");
    return parsedEnv.data;
  }
}

const env = loadEnv();

export const ServerConfig = {
  PORT: env.PORT,
};
