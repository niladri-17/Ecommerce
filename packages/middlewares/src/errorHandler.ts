const errorHandler = (err: Error, req: any, res: any, next: any) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal server error" });
}

export default errorHandler;
