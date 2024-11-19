
import {Router} from "express";
import { submitScore } from "./score-controller";

export const scoreRouter = Router();

scoreRouter.post("/", submitScore);