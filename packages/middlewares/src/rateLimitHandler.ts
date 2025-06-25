import rateLimit from "express-rate-limit";
import { Http } from "../../config/src";

const rateLimitHandler = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  limit: 5, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    status: Http.errors["TOO_MANY_REQUESTS"],
    message: "Too many requests, please try again later.",
    timestamp: new Date().toISOString(),
  },
});

export default rateLimitHandler;
