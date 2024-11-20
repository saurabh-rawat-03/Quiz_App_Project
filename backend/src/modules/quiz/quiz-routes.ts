
import {Router} from "express";

import { auth } from "../../shared/middlewares/auth";
import { createQuiz, getAllQuizzes, getQuiz, submitQuiz } from "./quiz-controller";

export const quizRouter = Router();


quizRouter.post("/", auth, createQuiz);
quizRouter.get("/", auth, getAllQuizzes);
quizRouter.get("/:id", auth, getQuiz);
quizRouter.get("/submit", auth, submitQuiz);


