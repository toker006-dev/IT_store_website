import { Router } from "express";
import { createOrder, getOrders } from "../controllers/order.controller";
import { authenticate } from "../middleware/auth";

const router = Router();

router.use(authenticate);

router.post("/", createOrder);
router.get("/", getOrders);

export default router;
