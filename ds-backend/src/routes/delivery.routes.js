import express from "express";
// import { protect, adminProtect } from '../middleware/auth.js'
import {
  getAllDeliveryController,
  getDeliveryByIdController,
  getDeliveryByDeliveryIdController,
  createDeliveryController,
  updateDeliveryController,
  // deleteDeliveryController,
} from "../controllers/delivery.controller";
import { doubleCsrfProtection, csrfErrorHandler } from "../middleware/csrf";


const deliveryRouter = express.Router();

deliveryRouter.get("/", getAllDeliveryController);
deliveryRouter.get("/read-delivery", getDeliveryByIdController);
deliveryRouter.get("/:delivery_id", getDeliveryByDeliveryIdController);

deliveryRouter.post(
  "/create",
  doubleCsrfProtection,
  csrfErrorHandler,
  createDeliveryController
);
deliveryRouter.put(
  "/update",
  doubleCsrfProtection,
  csrfErrorHandler,
  updateDeliveryController
);

export default deliveryRouter;
