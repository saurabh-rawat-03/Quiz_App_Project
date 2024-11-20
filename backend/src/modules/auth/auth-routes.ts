import { Router } from "express";
import { loginUser, registerUser } from "./auth-controller";


export const userRouter = Router();

userRouter.post("/", registerUser);
userRouter.post("/login", loginUser);

