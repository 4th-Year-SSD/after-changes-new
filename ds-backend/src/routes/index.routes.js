import express from "express";
import authRouter from "./auth.routes";
import userRouter from "./user.routes";
import productRouter from "./product.routes";
import orderRouter from "./order.routes";
import paymentRouter from "./payment.routes";
import cartRouter from "./cart.routes";
import commissionRouter from "./commission.routes";
import reviewRouter from "./review.routes";
import deliveryRouter from "./delivery.routes";


const router = express.Router();
//root auth route
router.use("/auth", authRouter);
//root user route
router.use("/user", userRouter);

router.use("/product", productRouter);
router.use("/commission", commissionRouter);
router.use("/order", orderRouter);
router.use("/payment", paymentRouter);
router.use("/cart", cartRouter);
router.use("/reviews", reviewRouter);
router.use("/delivery", deliveryRouter);

export default router;
