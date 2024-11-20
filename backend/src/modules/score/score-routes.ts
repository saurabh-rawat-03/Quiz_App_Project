
import {Router} from "express";
import { getQuizScores, getUserScores, submitScore } from "./score-controller";
import { auth } from "../../shared/middlewares/auth";

export const scoreRouter = Router();

scoreRouter.post("/", auth, submitScore);
scoreRouter.get("/quiz/:quizId/scores", getQuizScores);
scoreRouter.get("/user/:userId/scores", getUserScores);

