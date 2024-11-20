"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const connection_1 = __importDefault(require("./shared/db/connection"));
const PORT = process.env.PORT || 4000;
(0, connection_1.default)();
app_1.default.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}`);
});
