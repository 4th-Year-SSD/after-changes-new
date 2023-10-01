import { Router } from "express";
import { makePayment, updatePayment } from "../controllers/payment.controller";
const paymentRouter = Router();
import { doubleCsrfProtection, csrfErrorHandler } from "../middleware/csrf";

paymentRouter.post("/", doubleCsrfProtection, csrfErrorHandler,makePayment);
paymentRouter.patch(
  "/:_id",
    doubleCsrfProtection,
  csrfErrorHandler,
  updatePayment,

);

export default paymentRouter;
