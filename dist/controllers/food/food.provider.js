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
const constant_1 = require("../../config/constant");
const logger_helper_1 = require("../../config/logger_helper");
const food_model_1 = __importDefault(require("../../models/food.model"));
const foodProvider = {
    findAll: (offset, limit) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [foods, total] = yield Promise.all([
                food_model_1.default.find().skip(offset).limit(limit).populate('comments').lean(),
                food_model_1.default.count()
            ]);
            return { limit, offset, total, datas: foods };
        }
        catch (error) {
            throw (0, logger_helper_1.logError)({ message: 'Get foods error', error });
        }
    }),
    findByAttribute: (search, options) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            const sort = (_a = options.sort) !== null && _a !== void 0 ? _a : {};
            const offset = (_b = options.offset) !== null && _b !== void 0 ? _b : constant_1.DEFAULT.OFFSET;
            const limit = (_c = options.limit) !== null && _c !== void 0 ? _c : constant_1.DEFAULT.LIMIT;
            const foods = yield food_model_1.default.find(search)
                .sort(sort)
                .skip(offset)
                .limit(limit)
                .populate('comments')
                .lean();
            return { limit, offset, total: Math.min(foods.length, 10), datas: foods };
        }
        catch (error) {
            throw (0, logger_helper_1.logError)({ message: 'Get foods error', error });
        }
    }),
    findById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield food_model_1.default.findById(id);
            return user;
        }
        catch (error) {
            throw (0, logger_helper_1.logError)({ message: 'Get food error', error });
        }
    }),
    special1: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const resultSort = yield food_model_1.default.aggregate([
                { $unwind: '$comments' },
                {
                    $group: {
                        _id: '$_id',
                        comments: { $push: '$comments' },
                        size: { $sum: 1 }
                    }
                },
                { $sort: { size: 1 } }
            ]).limit(5);
            const foods = yield food_model_1.default.populate(resultSort, { path: 'comments' });
            return {
                total: Math.min(5, foods.length),
                limit: 5,
                offset: 0,
                datas: foods
            };
        }
        catch (error) {
            throw (0, logger_helper_1.logError)({ message: 'Get food error', error });
        }
    })
};
exports.default = foodProvider;
