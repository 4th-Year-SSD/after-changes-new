import { Router } from "express";
import {
  getCommission,
  addCommission,
  updateCommission,
} from "../controllers/commission.controller";
import { doubleCsrfProtection ,csrfErrorHandler } from "../utils/csrf";
const commissionRouter = Router();

commissionRouter .get("/", getCommission);
commissionRouter.post(
  "/",
  doubleCsrfProtection,
  csrfErrorHandler,
  addCommission
);
commissionRouter.patch(
  "/:_id",
  doubleCsrfProtection,
  csrfErrorHandler,
  updateCommission
);

export default commissionRouter ;
