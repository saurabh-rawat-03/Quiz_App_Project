"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const user_model_1 = __importDefault(require("./user-model"));
const jwt_utils_1 = require("../../shared/utils/jwt-utils");
const password_utils_1 = require("../../shared/utils/password-utils");
const registerUser = async (req, res) => {
    try {
        const { email, password, name, college } = req.body;
        const exists = await user_model_1.default.findOne({ email });
        if (exists) {
            return res.status(300).json({ message: "User Already Exists" });
        }
        const hashedPassword = await (0, password_utils_1.hashPassword)(password);
        const user = await user_model_1.default.create({ email, password: hashedPassword, name, college });
        const token = (0, jwt_utils_1.getToken)(user._id);
        res.status(201).json({ msg: "Registration Successful ", user, token });
    }
    catch (err) {
        res.status(500).json({ error: "Registration Failed" });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await user_model_1.default.findOne({ email });
        if (!user || !(await (0, password_utils_1.verifyPassword)(password, user.password))) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }
        const token = (0, jwt_utils_1.getToken)(user._id);
        res.status(200).json({ message: "Login Successfully", token: token });
    }
    catch (err) {
        return res.status(500).json({ error: "Login Failed", err });
    }
};
exports.loginUser = loginUser;
