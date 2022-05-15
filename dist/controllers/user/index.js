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
const constant_2 = require("../../helpers/constant");
const user_model_1 = require("../../models/user.model");
const user_provider_1 = __importDefault(require("./user.provider"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, birth, gender, password, avatar, email } = req.body;
    try {
        const User = {
            name: name,
            birth: new Date(birth),
            gender: user_model_1.UserGender[`${gender}`.toLowerCase()],
            email: email,
            password: password,
            avatar: avatar !== null && avatar !== void 0 ? avatar : ''
        };
        const result = yield user_provider_1.default.create(User);
        return res.status(constant_2.statusCode.success.CREATED).json(result);
    }
    catch (error) {
        return res
            .status(constant_2.statusCode.server_error.INTERNAL_SERVER_ERROR)
            .json(error);
    }
});
const readUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req.params.userId) !== null && _a !== void 0 ? _a : '';
    try {
        const result = yield user_provider_1.default.findById(id);
        if (!result)
            return res
                .status(constant_2.statusCode.error.NOT_FOUND)
                .json({ message: 'Not found' });
        return res.status(constant_2.statusCode.success.OK).json(result);
    }
    catch (error) {
        return res
            .status(constant_2.statusCode.server_error.INTERNAL_SERVER_ERROR)
            .json(error);
    }
});
const readAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offset = Number(req.query.offset) || constant_1.DEFAULT.OFFSET;
        const limit = Number(req.query.limit) || constant_1.DEFAULT.LIMIT;
        const result = yield user_provider_1.default.findAll(offset, limit);
        return res.status(constant_2.statusCode.success.OK).json(result);
    }
    catch (error) {
        return res
            .status(constant_2.statusCode.server_error.INTERNAL_SERVER_ERROR)
            .json(error);
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const id = (_b = req.params.userId) !== null && _b !== void 0 ? _b : '';
    const { name, birth, gender, avatar } = req.body;
    try {
        const result = yield user_provider_1.default.updateById(id, {
            name: name,
            birth: birth,
            gender: gender,
            avatar: avatar
        });
        if (!result)
            return res
                .status(constant_2.statusCode.error.NOT_FOUND)
                .json({ message: 'Not found' });
        return res.status(constant_2.statusCode.success.OK).json(result);
    }
    catch (error) {
        return res
            .status(constant_2.statusCode.server_error.INTERNAL_SERVER_ERROR)
            .json(error);
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const id = (_c = req.params.userId) !== null && _c !== void 0 ? _c : '';
    try {
        const result = yield user_provider_1.default.deleteById(id);
        if (!result)
            return res
                .status(constant_2.statusCode.error.NOT_FOUND)
                .json({ message: 'Not found' });
        return res.status(constant_2.statusCode.success.OK).json(result);
    }
    catch (error) {
        return res
            .status(constant_2.statusCode.server_error.INTERNAL_SERVER_ERROR)
            .json(error);
    }
});
exports.default = {
    createUser,
    readUser,
    readAll,
    updateUser,
    deleteUser
};
