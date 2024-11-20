"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MONGO_URL = process.env.MONGO_URL || "";
function connectDB() {
    mongoose_1.default.connect(MONGO_URL).then(() => console.log("DB connected successfully")).catch((err) => console.log("Errorr", err));
}
exports.default = connectDB;
