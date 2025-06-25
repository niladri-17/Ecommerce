import { Request, Response } from "express";
import morgan from "morgan";

class RequestLogger {
//   private logger: morgan.Morgan<Request, Response>;

//   constructor() {
//     this.logger = morgan("combined");
//   }

//   public logRequest(req: any, res: any, next: any): void {
//     this.logger(req, res, next);
//   }
}

export default new RequestLogger();
