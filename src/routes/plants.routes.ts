import { Router } from "express";
import * as ctr from "../controllers";

const router = Router();

router.get("/", ctr.getAllPlants);

router.post("/", ctr.createPlant);

export default router;
