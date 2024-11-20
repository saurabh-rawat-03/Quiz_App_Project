"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const score_routes_1 = require("./modules/score/score-routes");
const auth_routes_1 = require("./modules/auth/auth-routes");
const quiz_routes_1 = require("./modules/quiz/quiz-routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json()); //body read
app.use('/users', auth_routes_1.userRouter);
app.use("/scores", score_routes_1.scoreRouter);
app.use("/quizzes", quiz_routes_1.quizRouter);
exports.default = app;
