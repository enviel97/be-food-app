"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const cli_progress_1 = require("cli-progress");
const isString = (args) => typeof args === 'string';
exports.default = {
    log: (args) => console.log('>>>>>>>>', args),
    success: (args) => console.log(`[${new Date().toLocaleString()}]`, chalk_1.default.bgGreen.black.bold(` SUCCESS `), isString(args) ? chalk_1.default.grey(args) : args),
    error: (args) => console.log(`[${new Date().toLocaleString()}]`, chalk_1.default.bgRed.black.bold(` Error `), isString(args) ? chalk_1.default.grey(args) : args),
    warn: (args) => console.log(`[${new Date().toLocaleString()}]`, chalk_1.default.bgYellow.black.bold(` Warning `), isString(args) ? chalk_1.default.grey(args) : args),
    progress: new cli_progress_1.SingleBar({
        format: 'CLI Progress |' +
            chalk_1.default.cyan('{bar}') +
            '| {percentage}% || {value}/{total} Chunks || Speed: {speed}',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true
    })
};
