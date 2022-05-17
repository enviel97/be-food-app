"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const SALT_ROUNDS = 10;
const encode = (password) => {
    return (0, bcryptjs_1.hash)(password, SALT_ROUNDS);
};
const verify = (password, hash) => {
    return (0, bcryptjs_1.compare)(password, hash);
};
exports.default = {
    hash: encode,
    compare: verify
};
