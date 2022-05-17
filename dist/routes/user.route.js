"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../controllers/user"));
const router = (0, express_1.Router)();
router.get('/get/:userId', user_1.default.readUser);
router.patch('/update/:userId', user_1.default.updateUser);
router.delete('/delete/:userId', user_1.default.deleteUser);
router.post('/create', user_1.default.createUser);
router.post('/signin', user_1.default.signin);
exports.default = {
    name: '/user',
    router
};
