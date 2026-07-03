import dotenv from "dotenv";

type ServerConfigType = {
  PORT: number;
};

function loadEnv() {
  dotenv.config();
  console.log("Environment variable loaded successfully!");
}

loadEnv();

export const ServerConfig: ServerConfigType = {
  PORT: Number(process.env.PORT),
};
