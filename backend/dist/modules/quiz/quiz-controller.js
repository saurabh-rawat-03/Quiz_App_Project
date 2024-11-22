"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitQuiz = exports.getQuiz = exports.createQuiz = exports.getAllQuizzes = void 0;
const quiz_model_1 = require("./quiz-model");
const user_model_1 = __importDefault(require("../auth/user-model"));
const score_model_1 = require("../score/score-model");
const getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await quiz_model_1.Quiz.find({});
        res.status(200).json(quizzes);
    }
    catch (err) {
        // logger("Error in");
        res.status(5001).json({ error: "Failed to fetch Quizzes" });
    }
};
exports.getAllQuizzes = getAllQuizzes;
const createQuiz = async (req, res) => {
    try {
        const quiz = new quiz_model_1.Quiz(...req.body);
        await quiz.save();
        res.status(201).json({ quiz, message: "Created Successfully" });
    }
    catch (err) {
        res.status(400).json({ error: "Failed to create quiz" });
    }
};
exports.createQuiz = createQuiz;
const getQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        const quiz = await quiz_model_1.Quiz.findById(id);
        if (!quiz)
            throw new Error();
        res.status(200).json({ quiz });
    }
    catch (err) {
        res.status(404).json({ error: "Quiz Not Found" });
    }
};
exports.getQuiz = getQuiz;
const submitQuiz = async (req, res) => {
    try {
        const { quizId, answers } = req.body;
        const quiz = await quiz_model_1.Quiz.findById(quizId);
        if (!quiz)
            throw new Error("Quiz Not Found");
        let score = 0;
        answers.forEach((answer, index) => {
            if (answer == quiz.questions[index].correctOption) {
                score += quiz.questions[index].points;
            }
        });
        const user = await user_model_1.default.findById(req.user.userId);
        if (!user)
            throw new Error("User Not Found");
        const newScore = new score_model_1.Score({
            userId: user._id,
            quizId: quiz._id,
            score,
            totalQuestions: quiz.questions.length.toFixed,
        });
        await newScore.save();
        user.attemptedQuiz.push({
            quizId,
            score,
            totalQuestions: quiz.questions.length,
            completedAt: new Date(),
        });
        await user.save();
        res.json({ score, totalQuestions: quiz.questions.length });
    }
    catch (err) {
        res.status(400).json({ error: "Failed To Submit Quiz" });
    }
};
exports.submitQuiz = submitQuiz;
