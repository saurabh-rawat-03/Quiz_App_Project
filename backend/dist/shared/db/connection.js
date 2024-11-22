"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = seedDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
const quiz_model_1 = require("../../modules/quiz/quiz-model");
const user_model_1 = __importDefault(require("../../modules/auth/user-model"));
const MONGO_URL = process.env.MONGO_URL || "";
function connectDB() {
    mongoose_1.default.connect(MONGO_URL).then(() => console.log("DB connected successfully")).catch((err) => console.log("Errorr", err));
}
const sampleQuizzes = [
    {
        title: "JavaScript Fundamentals",
        description: "Test your knowledge of JavaScript basics",
        questions: [
            {
                text: "What is the result of '2' + 2 in JavaScript?",
                options: ["4", "22", "Error", "undefined"],
                correctOption: 1, // Index of "22"
                points: 10,
            },
            {
                text: "Which method removes the last element from an array?",
                options: ["pop()", "push()", "shift()", "unshift()"],
                correctOption: 0, // Index of "pop()"
                points: 10,
            },
            {
                text: "What is the typeof null in JavaScript?",
                options: ["null", "undefined", "object", "number"],
                correctOption: 2, // Index of "object"
                points: 15,
            },
        ],
        duration: 300, // 5 minutes in seconds
    },
    {
        title: "Web Development Basics",
        description: "Test your knowledge of HTML and CSS",
        questions: [
            {
                text: "What does HTML stand for?",
                options: [
                    "Hyper Text Markup Language",
                    "High Tech Modern Language",
                    "Hyper Transfer Markup Language",
                    "Home Tool Markup Language",
                ],
                correctOption: 0,
                points: 5,
            },
            {
                text: "Which CSS property is used to change the text color?",
                options: ["text-color", "color", "font-color", "text-style"],
                correctOption: 1,
                points: 5,
            },
        ],
        duration: 180, // 3 minutes in seconds
    },
    {
        title: "React Fundamentals",
        description: "Test your knowledge of React.js",
        questions: [
            {
                text: "What is a React Hook?",
                options: [
                    "A fishing tool",
                    "A function that lets you use state in functional components",
                    "A class component feature",
                    "A debugging tool",
                ],
                correctOption: 1,
                points: 15,
            },
            {
                text: "What is JSX?",
                options: [
                    "JavaScript XML",
                    "Java Syntax Extension",
                    "JavaScript XSL",
                    "Java Standard XML",
                ],
                correctOption: 0,
                points: 10,
            },
        ],
        duration: 240, // 4 minutes in seconds
    },
];
// Sample user data
const sampleUsers = [
    {
        email: "john@example.com",
        password: "password123",
        name: "John Doe",
        attemptedQuizzes: [], // Will be populated after creating quizzes
    },
    {
        email: "jane@example.com",
        password: "password456",
        name: "Jane Smith",
        attemptedQuizzes: [],
    },
    {
        email: "bob@example.com",
        password: "password789",
        name: "Bob Wilson",
        attemptedQuizzes: [],
    },
];
async function seedDatabase() {
    try {
        await quiz_model_1.Quiz.deleteMany({});
        await user_model_1.default.deleteMany({});
        const createdQuizzes = await quiz_model_1.Quiz.insertMany(sampleQuizzes);
        console.log("Quizz created Success fully");
        const attemptedQuizData = createdQuizzes.map((quiz) => {
            quizId: quiz._id;
            score: Math.floor(Math.random() * (quiz.questions.length * 10));
            totalQuestions: quiz.questions.length;
            completedAt: new Date();
        });
        const userWithAttempts = sampleUsers.map((user, index) => (Object.assign(Object.assign({}, user), { attemptedQuizzes: attemptedQuizData.slice(0, Math.floor(Math.random() * 3) + 1) })));
        // const userWithAttempts = sampleUsers.map((user, index) => ({
        //     ...userWithAttempts,
        //     attemptedQuizzes : attemptedQuizData.slice(0, Math.floor(Math.random() * 3) + 1)
        // }));
        await user_model_1.default.insertMany(userWithAttempts);
    }
    catch (err) {
        console.log("Error ", err);
    }
    finally {
        mongoose_1.default.disconnect();
    }
}
exports.default = connectDB;
