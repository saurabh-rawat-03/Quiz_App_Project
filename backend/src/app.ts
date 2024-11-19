import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { scoreRouter } from "./modules/score/score-routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); //body read
app.use("/scores", scoreRouter);

export default app;