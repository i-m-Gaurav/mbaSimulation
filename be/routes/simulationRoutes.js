import express from "express";
import {
  createSimulation,
  updateSimulation,
  getSimulation,
} from "../controllers/simulationControllers.js";

const router = express.Router();

router.post("/", createSimulation);
router.put("/:id", updateSimulation);
router.get("/:id", getSimulation);

export default router;
