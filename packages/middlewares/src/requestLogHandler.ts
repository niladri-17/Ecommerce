import { Request, Response } from "express";
import { NextFunction } from "http-proxy-middleware/dist/types";
import morgan from "morgan";

const requestLogHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  morgan("dev")(req, res, next);

export default requestLogHandler;
