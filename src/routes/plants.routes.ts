import { Router } from "express";
import * as ctr from "../controllers";

const router = Router();

router.get("/", ctr.getAllPlants);

router.get("/:id", ctr.getPlantById);

router.post("/", ctr.createPlant);

router.put("/water/:id", ctr.waterPlant);

router.put("/fertilize/:id", ctr.fertilizePlant);

router.delete("/", ctr.deletePlant);

export default router;
