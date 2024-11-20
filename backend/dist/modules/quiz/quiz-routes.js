"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../../shared/middlewares/auth");
const quiz_controller_1 = require("./quiz-controller");
exports.quizRouter = (0, express_1.Router)();
exports.quizRouter.post("/", auth_1.auth, quiz_controller_1.createQuiz);
exports.quizRouter.get("/", auth_1.auth, quiz_controller_1.getAllQuizzes);
exports.quizRouter.get("/:id", auth_1.auth, quiz_controller_1.getQuiz);
exports.quizRouter.get("/submit", auth_1.auth, quiz_controller_1.submitQuiz);
