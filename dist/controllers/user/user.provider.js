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
const logger_helper_1 = require("../../config/logger_helper");
const user_model_1 = __importDefault(require("../../models/user.model"));
const authProvider = {
    findById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.default.findById(id);
            return user;
        }
        catch (error) {
            throw (0, logger_helper_1.logError)({ message: 'Get user error', error });
        }
    }),
    findAll: (offset, limit) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [users, total] = yield Promise.all([
                user_model_1.default.find().skip(offset).limit(limit).lean(),
                user_model_1.default.count()
            ]);
            return { limit, offset, total, datas: users };
        }
        catch (error) {
            throw (0, logger_helper_1.logError)({ message: 'Get users error', error });
        }
    }),
    create: (user) => __awaiter(void 0, void 0, void 0, function* () {
        const _user = new user_model_1.default(Object.assign({}, user));
        try {
            const user_1 = yield _user.save();
            return user_1;
        }
        catch (error) {
            throw (0, logger_helper_1.logError)({ message: 'Create user error', error });
        }
    }),
    updateById: (id, newObject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.default.findByIdAndUpdate(id, newObject, {
                new: true
            });
            return user;
        }
        catch (error) {
            throw (0, logger_helper_1.logError)({ message: 'Create user error', error });
        }
    }),
    deleteById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.default.findByIdAndDelete(id);
            return user;
        }
        catch (error) {
            throw (0, logger_helper_1.logError)({ message: 'Create user error', error });
        }
    })
};
exports.default = authProvider;
