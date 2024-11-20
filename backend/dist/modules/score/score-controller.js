"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserScores = exports.getQuizScores = exports.submitScore = void 0;
const score_model_1 = require("./score-model");
const quiz_model_1 = require("../quiz/quiz-model");
const submitScore = async (req, res) => {
    try {
        const { userId, quizId, score } = req.body;
        const quiz = await quiz_model_1.Quiz.findById(quizId);
        const newScore = await score_model_1.Score.create({
            userId,
            quizId,
            score,
            totalQuestions: quiz === null || quiz === void 0 ? void 0 : quiz.questions.length
        });
        res.status(201).json(newScore);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to Submit Score" });
    }
};
exports.submitScore = submitScore;
const getQuizScores = async (req, res) => {
    try {
        const { quizId } = req.params;
        const score = await score_model_1.Score.findById({ quizId }).populate("userId", "name", "email").sort({ completedAt: -1 });
        res.status(200).json(score);
    }
    catch (err) {
        res.status(400).json({ error: "Failed to fetch quiz score" });
    }
};
exports.getQuizScores = getQuizScores;
const getUserScores = async (req, res) => {
    try {
        const { userId } = req.params;
        const score = await score_model_1.Score.findById({ userId }).populate("quizId", "title", "description").sort({ completedAt: -1 });
        res.status(200).json(score);
    }
    catch (err) {
        res.status(400).json({ error: "Failed to fetch user score" });
    }
};
exports.getUserScores = getUserScores;
