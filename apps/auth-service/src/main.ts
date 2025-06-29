import express from "express";
import config from "./config";

const port = config.PORT;

const app = express();

app.get("/health", (req, res) => {
  res.send({ message: "Welcome to auth-service!" });
});

app.get("/error", (req, res) => {
  throw new Error("This is a test error");
});

app.get("/", (req, res) => {
  res.send({ message: "Hello API" });
});

app.listen(port, () => {
  console.log(`[ ready ] http://localhost:${port}`);
});
