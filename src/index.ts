import express from "express";
import v1Router from "./routers/v1/index.router.js";
import { ServerConfig } from "./config/index.js";
import { genericErrorHandler } from "./middlewares/error.middleware.js";
import logger from "./config/logger.config.js";
import { attachCorrelationIDMiddleware } from "./middlewares/correlation.middleware.js";

const app = express();

app.use(express.json());
app.use(attachCorrelationIDMiddleware);
app.use("/api", v1Router);
app.use(genericErrorHandler);

app.listen(ServerConfig.PORT, () => {
  console.log(`Server is up and running on port: ${ServerConfig.PORT}`);
  logger.info("Press ctrl + C to stop the server!!", { data: "Something" });
});
