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
exports.signin = void 0;
const bcrypt_1 = __importDefault(require("../../helpers/bcrypt"));
const constant_1 = require("../../helpers/constant");
const token_1 = require("../../helpers/token");
const models_1 = require("../../models");
const user_model_1 = require("../../models/users/user.model");
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
        return res.status(constant_1.statusCode.success.CREATED).json({
            _id: result._id.toHexString(),
            name: result.name,
            birth: result.birth,
            gender: result.gender,
            email: result.email,
            avatar: result.avatar
        });
    }
    catch (error) {
        return res
            .status(constant_1.statusCode.server_error.INTERNAL_SERVER_ERROR)
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
                .status(constant_1.statusCode.error.NOT_FOUND)
                .json({ message: 'Not found' });
        return res.status(constant_1.statusCode.success.OK).json(result);
    }
    catch (error) {
        return res
            .status(constant_1.statusCode.server_error.INTERNAL_SERVER_ERROR)
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
                .status(constant_1.statusCode.error.NOT_FOUND)
                .json({ message: 'Not found' });
        return res.status(constant_1.statusCode.success.OK).json(result);
    }
    catch (error) {
        return res
            .status(constant_1.statusCode.server_error.INTERNAL_SERVER_ERROR)
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
                .status(constant_1.statusCode.error.NOT_FOUND)
                .json({ message: 'Not found' });
        return res.status(constant_1.statusCode.success.OK).json(result);
    }
    catch (error) {
        return res
            .status(constant_1.statusCode.server_error.INTERNAL_SERVER_ERROR)
            .json(error);
    }
});
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const { email, password } = req.body;
    const user = yield models_1.UserModel.findOne({ email })
        .select({
        id: 1,
        password: 1,
        name: 1,
        email: 1,
        avatar: 1,
        gender: 1,
        birth: 1
    })
        .lean();
    if (!user) {
        return res
            .status(constant_1.statusCode.error.NOT_FOUND)
            .json({ message: 'Invalid username or password' });
    }
    const id = user['_id'].toString();
    if (yield bcrypt_1.default.compare(password, (_d = user.password) !== null && _d !== void 0 ? _d : '')) {
        const token = token_1.Token.create(id);
        return res.status(constant_1.statusCode.success.OK).json({
            token: token,
            user: {
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                gender: user.gender,
                birth: user.birth
            }
        });
    }
    return res
        .status(constant_1.statusCode.error.NOT_FOUND)
        .json({ message: 'Invalid username or password' });
});
exports.signin = signin;
exports.default = {
    createUser,
    readUser,
    updateUser,
    deleteUser,
    signin: exports.signin
};
