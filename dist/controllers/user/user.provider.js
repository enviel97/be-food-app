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
Object.defineProperty(exports, "__esModule", { value: true });
const logger_helper_1 = require("../../config/logger_helper");
const models_1 = require("../../models");
const authProvider = {
    findById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield models_1.UserModel.findById(id);
            return user;
        }
        catch (error) {
            throw (0, logger_helper_1.logError)({ message: 'Get user error', error });
        }
    }),
    create: (user) => __awaiter(void 0, void 0, void 0, function* () {
        const _user = new models_1.UserModel(Object.assign({}, user));
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
            const user = yield models_1.UserModel.findByIdAndUpdate(id, newObject, {
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
            const user = yield models_1.UserModel.findByIdAndDelete(id);
            return user;
        }
        catch (error) {
            throw (0, logger_helper_1.logError)({ message: 'Delete user error', error });
        }
    }),
    findOne: (search) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const food = yield models_1.UserModel.findOne(search).lean();
            return food;
        }
        catch (error) {
            throw (0, logger_helper_1.logError)({ message: 'Get user error', error });
        }
    }),
    updateByAttribute: (search, update) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield models_1.UserModel.findOneAndUpdate(search, update, {
                new: true
            }).lean();
            return user;
        }
        catch (error) {
            throw (0, logger_helper_1.logError)({ message: 'Change password user failure', error });
        }
    })
};
exports.default = authProvider;
