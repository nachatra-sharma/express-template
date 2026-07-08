import dotenv from "dotenv";
import { envSchema } from "../validators/env.validator.js";

type ServerConfigType = {
  PORT: number;
};

function loadEnv() {
  dotenv.config();
  const isPortExist = envSchema.safeParse(Number(process.env.PORT));

  if (!isPortExist.success) {
    throw new Error(isPortExist.error?.issues[0]?.message);
  }
  console.log("Environment variable loaded successfully!");
}

loadEnv();

export const ServerConfig: ServerConfigType = {
  PORT: Number(process.env.PORT),
};
