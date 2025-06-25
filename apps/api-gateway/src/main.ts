import express from "express";
import cors from "cors";
import {
  requestLogHandler,
  rateLimitHandler,
} from "../../../packages/middlewares/src";
import { config } from "./config";
import { AppLogger } from ".././../../packages/loggers/src";
import { proxyServices } from "./config/services";
import { Request, Response, NextFunction } from "express";
import { Http } from "../../../packages/config/src";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimitHandler);
app.use(requestLogHandler);

app.get("/health", (req, res) => {
  res.send({ message: "Welcome to api-gateway!" });
});

// Service routes
proxyServices(app);

// 404 handler
app.use((req: Request, res: Response) => {
  AppLogger.warn(`Resource not found: ${req.method} ${req.url}`);
  res.status(Http.errors["NOT_FOUND"]).json({ message: "resource not found" });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  AppLogger.error("Unhandled error:", err);
  res
    .status(Http.errors["INTERNAL_SERVER_ERROR"])
    .json({ message: "Internal server error" });
});

const port = config.PORT;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on("error", console.error);
