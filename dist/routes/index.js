"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_route_1 = __importDefault(require("./user.route"));
const food_route_1 = __importDefault(require("./food.route"));
const route = [user_route_1.default, food_route_1.default];
exports.default = route;
