"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.UserGender = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("../../helpers/bcrypt"));
var UserGender;
(function (UserGender) {
    UserGender["male"] = "Male";
    UserGender["female"] = "Female";
    UserGender["private"] = "Private";
})(UserGender = exports.UserGender || (exports.UserGender = {}));
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    avatar: { type: String, default: '' },
    email: { type: String, required: true, immutable: true, unique: true },
    password: { type: String, required: true, select: false },
    gender: { type: String, enum: UserGender, default: UserGender.female },
    birth: { type: Date, required: true }
}, { timestamps: true });
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = this;
        if (this.isModified('password') || this.isNew) {
            const hash = yield bcrypt_1.default.hash(user.password);
            user.password = hash;
        }
        return next();
    });
});
UserSchema.pre('findOneAndUpdate', function (next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const update = this.getUpdate();
        const password = (_a = update['password']) !== null && _a !== void 0 ? _a : undefined;
        if (!!password) {
            const hash = yield bcrypt_1.default.hash(password);
            this.setUpdate({ password: hash });
        }
    });
});
exports.default = mongoose_1.default.model('User', UserSchema);
