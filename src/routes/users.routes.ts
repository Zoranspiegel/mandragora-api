import { Router } from "express";
import * as ctr from "../controllers";

const router = Router();

router.get("/", ctr.getAllUsers);

router.post("/", ctr.createUser);

export default router;
