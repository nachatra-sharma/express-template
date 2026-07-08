import express from "express";
import v1Router from "./routers/v1/index.router.js";
import { ServerConfig } from "./config/index.js";
import { genericErrorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use("/api", v1Router);

app.use(genericErrorHandler);

app.listen(ServerConfig.PORT, () => {
  console.log(`Server is up and running on port: ${ServerConfig.PORT}`);
});
