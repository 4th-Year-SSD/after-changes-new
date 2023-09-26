import express from "express";
import authRouter from "./auth.routes";
import userRouter from "./user.routes";

const router = express.Router();
//root auth route
router.use("/auth", authRouter);
//root user route
router.use("/user", userRouter);

export default router;
