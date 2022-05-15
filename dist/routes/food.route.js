"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const food_1 = __importDefault(require("../controllers/food"));
const router = (0, express_1.Router)();
router.get('/get/:foodId', food_1.default.getFood);
router.get('/get/popular', food_1.default.getPopularFood);
router.get('/get/getRegulation', food_1.default.getRegulation);
exports.default = {
    name: '/food',
    router
};
