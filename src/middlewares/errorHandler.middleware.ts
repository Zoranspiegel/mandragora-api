import { ErrorHandlerMiddleware } from "../../types";

export const errorHandler: ErrorHandlerMiddleware = (err, _req, res, _next) => {
  if (err instanceof Error) {
    res.status(500).json({ error: err.message || "Internal server error" });
  } else {
    res.status(500).json({ error: "Unknown server error" });
  }
};
