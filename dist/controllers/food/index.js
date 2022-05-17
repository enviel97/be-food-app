"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const food_provider_1 = __importDefault(require("./food.provider"));
const constant_1 = require("../../helpers/constant");
const constant_2 = require("../../config/constant");
const getPopularFood = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield food_provider_1.default.findByAttribute({}, {
            sort: { finalRate: -1, name: 1 },
            limit: 10,
            offset: 0
        });
        return res.status(constant_1.statusCode.success.OK).json(result);
    }
    catch (error) {
        return res
            .status(constant_1.statusCode.server_error.INTERNAL_SERVER_ERROR)
            .json(error);
    }
});
const getCommon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield food_provider_1.default.special1();
        return res.status(constant_1.statusCode.success.OK).json(result);
    }
    catch (error) {
        return res
            .status(constant_1.statusCode.server_error.INTERNAL_SERVER_ERROR)
            .json(error);
    }
});
const getFood = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foodId = req.params.foodId;
        const food = yield food_provider_1.default.findById(foodId);
        if (!food) {
            return res
                .status(constant_1.statusCode.error.NOT_FOUND)
                .json({ message: 'Not found' });
        }
        return res.status(constant_1.statusCode.success.OK).json(food);
    }
    catch (error) {
        return res
            .status(constant_1.statusCode.server_error.INTERNAL_SERVER_ERROR)
            .json(error);
    }
});
const getFoods = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offset = Number(req.query.offset) || constant_2.DEFAULT.OFFSET;
        const limit = Number(req.query.limit) || constant_2.DEFAULT.LIMIT;
        const food = yield food_provider_1.default.findAll(offset, limit);
        if (!food) {
            return res
                .status(constant_1.statusCode.error.NOT_FOUND)
                .json({ message: 'Not found' });
        }
        return res.status(constant_1.statusCode.success.OK).json(food);
    }
    catch (error) {
        return res
            .status(constant_1.statusCode.server_error.INTERNAL_SERVER_ERROR)
            .json(error);
    }
});
exports.default = { getPopularFood, getCommon, getFood, getFoods };
