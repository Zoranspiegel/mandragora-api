import { Router } from "express";
import * as ctr from "../controllers";

const router = Router();

router.get("/", ctr.getAllPlants);

export default router;
