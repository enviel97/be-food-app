"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config/config");
const encode = (data) => {
    const token = (0, jsonwebtoken_1.sign)({ data }, config_1.config.server.key, {
        issuer: 'com.auth',
        expiresIn: '365d',
        algorithm: 'HS256'
    });
    return token;
};
exports.Token = {
    create: encode
};
