"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quiz = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const quizSchema = new mongoose_1.default.Schema({ title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    questions: [
        {
            text: { type: String, required: true },
            options: [{ type: String, required: true }],
            correctOption: { type: Number, required: true },
            points: { type: Number, required: true, default: 1 },
        },
    ],
    duration: {
        type: Number,
        required: true,
    },
});
exports.Quiz = mongoose_1.default.model("quiz", quizSchema);
