import express from "express";
import { auth } from "../../middlewares/auth";
import { isAdmin } from "../../middlewares/isAdmin";
import { validateRequest } from "../../middlewares/validateRequest";
import { orderController } from "./order.controller";
import {
  createOrderSchema,
  updateOrderPrescriptionStatusSchema,
  updateOrderStatusSchema,
} from "./order.validation";

const router = express.Router();

router.post(
  "/",
  auth(),
  validateRequest(createOrderSchema),
  orderController.createOrder
);
router.get("/my-orders", auth(), orderController.getUserOrders);
router.get("/all-orders", auth(), isAdmin, orderController.getAllOrders);
router.get("/:id", auth(), orderController.getOrderById);
router.patch("/:id/cancel", auth(), orderController.cancelOrder);
router.patch(
  "/:id/status",
  auth(),
  validateRequest(updateOrderStatusSchema),
  orderController.updateOrderStatus
);
router.patch(
  "/:id/orderPrescriptionStatus",
  auth(),
  validateRequest(updateOrderPrescriptionStatusSchema),
  orderController.updateOrderPrescriptionStatus
);

export const orderRoutes = router;
