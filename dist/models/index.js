"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = exports.FoodModel = exports.UserModel = void 0;
var user_model_1 = require("./users/user.model");
Object.defineProperty(exports, "UserModel", { enumerable: true, get: function () { return __importDefault(user_model_1).default; } });
var food_model_1 = require("./foods/food.model");
Object.defineProperty(exports, "FoodModel", { enumerable: true, get: function () { return __importDefault(food_model_1).default; } });
var comment_model_1 = require("./comments/comment.model");
Object.defineProperty(exports, "CommentModel", { enumerable: true, get: function () { return __importDefault(comment_model_1).default; } });
