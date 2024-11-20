"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jwt_utils_1 = require("../utils/jwt-utils");
const auth = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer", "");
        if (!token)
            throw new Error();
        const decoded = (0, jwt_utils_1.verifyToken)(token);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(401).json({ error: "Please Authenticate" });
    }
};
exports.auth = auth;
