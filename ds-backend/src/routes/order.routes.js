const express = require("express");
import { adminProtect, protect } from "../middleware/auth.js";
import { doubleCsrfProtection, csrfErrorHandler } from "../middleware/csrf.js";
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/order.controller");
const orderRouter = express.Router();

orderRouter.route("/getAllOrders").get(protect, adminProtect, getAllOrders);
orderRouter
  .route("/")
  .post(protect, doubleCsrfProtection, csrfErrorHandler, createOrder)
  .get(protect, getAllOrders);
orderRouter
  .route("/:orderId")
  .get(protect, getOrderById)
  .put(protect, doubleCsrfProtection, csrfErrorHandler, updateOrderStatus)
  .delete(
    protect,
    doubleCsrfProtection,
    csrfErrorHandler,deleteOrder,
   
  );
orderRouter
  .route("/updateOrderStatus/:orderId")
  .put(
    protect,
    adminProtect,
    doubleCsrfProtection, csrfErrorHandler,
    updateOrderStatus,

  );

export default orderRouter;
