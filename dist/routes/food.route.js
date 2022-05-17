"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const food_1 = __importDefault(require("../controllers/food"));
const router = (0, express_1.Router)();
router.get('/get/popular', food_1.default.getPopularFood);
router.get('/get/common', food_1.default.getCommon);
router.get('/get', food_1.default.getFoods);
router.get('/get/:foodId', food_1.default.getFood);
exports.default = {
    name: '/food',
    router
};
