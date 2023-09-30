import express from "express";
import {
  getAll,
  update,
  deleteUser,
  getById,
  getMyDetails,
} from "../controllers/user.controller";
import { protect, adminProtect } from "../middleware/auth";
const userRouter = express.Router();
import { doubleCsrfProtection, csrfErrorHandler } from "../utils/csrf";
userRouter.get(
  "/",
  protect,
  doubleCsrfProtection,
  csrfErrorHandler,
  adminProtect,
  getAll
);
userRouter.get(
  "/my",
  protect,
  doubleCsrfProtection,
  csrfErrorHandler,
  getMyDetails
);
userRouter.put("/:id", protect, doubleCsrfProtection, csrfErrorHandler, update);
userRouter.get(
  "/:id",
  protect,
  doubleCsrfProtection,
  csrfErrorHandler,
  getById
);
// userRouter.delete('/:id', protect, deleteUser)

export default userRouter;
