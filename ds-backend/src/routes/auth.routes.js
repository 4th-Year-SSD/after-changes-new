import express from "express";
import { login, register, googleSignIn } from "../controllers/auth.controller";

const authRouter = express.Router();

//login route and signup or register route
authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/google-sginin", googleSignIn);

export default authRouter;
