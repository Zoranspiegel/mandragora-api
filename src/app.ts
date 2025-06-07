import express from "express";
import morgan from "morgan";
import cors from "cors";
import routes from "./routes";
import { errorHandler } from "./middlewares/errorHandler.middleware";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));

app.use("/api", routes);

app.use(errorHandler);

export default app;
