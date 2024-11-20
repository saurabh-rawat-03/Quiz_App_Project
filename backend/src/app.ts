import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { scoreRouter } from "./modules/score/score-routes";
import { userRouter } from "./modules/auth/auth-routes";
import { quizRouter } from "./modules/quiz/quiz-routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); //body read
app.use('/users', userRouter);
app.use("/scores", scoreRouter);
app.use("/quizzes", quizRouter);

export default app;