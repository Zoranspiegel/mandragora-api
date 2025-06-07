import { Router } from "express";
import fs from "fs";

const router = Router();

fs.readdirSync(__dirname).forEach((file) => {
  if (file.endsWith("routes.ts")) {
    const endpoint = `/${file.split(".")[0]}`;
    const route = require(`./${file}`).default;

    router.use(endpoint, route);
  }
});

export default router;
