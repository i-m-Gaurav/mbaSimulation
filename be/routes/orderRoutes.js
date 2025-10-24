import express from "express";
import {
  createOrderDetails,
  getOrderDetails,
} from "../controllers/orderControllers.js";

const router = express.Router();

router.post("/", createOrderDetails);
router.get("/:id", getOrderDetails);

export default router;
