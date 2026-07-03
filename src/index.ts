import express from "express";
import v1Router from "./routers/v1/index.router.js";
import { ServerConfig } from "./config/index.js";

const app = express();

app.use("/api", v1Router);

app.listen(ServerConfig.PORT, () => {
  console.log(`Server is up and running on port: ${ServerConfig.PORT}`);
});
