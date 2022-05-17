"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://dbFoodApp:${MONGO_PASSWORD}@database.abr1y.mongodb.net/${MONGO_USERNAME}`;
const SERVER_PORT = process.env.PORT || 3000;
const PRIVATE_KEY = process.env.PRIVATE_KEY || '';
const API_KEY = process.env.API_KEY || '';
exports.config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT,
        key: PRIVATE_KEY,
        api: API_KEY
    }
};
