"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logError = void 0;
const logger_1 = __importDefault(require("../library/logger"));
const logError = (props) => {
    const { message, error } = props;
    const _error = new Error(message);
    logger_1.default.error(_error.message);
    error !== null && error !== void 0 ? error : logger_1.default.log(error);
    return error;
};
exports.logError = logError;
