import express from "express";
import cors from "cors";
import {
  requestLogHandler,
  rateLimitHandler,
  errorHandler
} from "@packages/middlewares";
import { config } from "./config";
import { AppLogger } from "@packages/loggers";
import { proxyServices } from "./config/ServiceProxy";
import { Request, Response, NextFunction } from "express";
import {Http} from "@packages/config"
import cookieParser from "cookie-parser";
// import { AppError } from "../../../packages/errors/src";

const app = express();

app.use(
  cors({
    origin: "*", // Allow all origins by default
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// Middleware to parse JSON bodies
app.use(
  express.json({
    limit: "100mb",
    verify: (req: Request, res, buf, encoding) => {
      try {
        JSON.parse(buf.toString());
      } catch (error: any) {
        AppLogger.error("Invalid JSON payload", error);
        throw new Error(
          "Invalid JSON payload"
          // Http.errors["RequestValidation"]
        );
      }
    },
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("trust proxy", 1);


app.use(rateLimitHandler);
app.use(requestLogHandler);

app.get("/health", (req, res) => {
  // res.send({ message: "Welcome to api-gateway!" });
  throw new Error("This is a test error lala");

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
    .json({ message: "Internal server error vuyfucutcutt" });
});

const port = config.PORT;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on("error", console.error);
