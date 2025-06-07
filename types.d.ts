import type {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";

type ErrorHandlerMiddleware = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => void;

type AsyncController = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;
