"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth-controller");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post("/", auth_controller_1.registerUser);
exports.userRouter.post("/login", auth_controller_1.loginUser);
