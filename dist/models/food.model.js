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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodStatus = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var FoodStatus;
(function (FoodStatus) {
    FoodStatus["empty"] = "empty";
    FoodStatus["normal"] = "normal";
    FoodStatus["little"] = "little";
})(FoodStatus = exports.FoodStatus || (exports.FoodStatus = {}));
const foodSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    imgs: { type: [String], required: true, default: [] },
    comments: { type: [String], default: [], ref: 'Comment' },
    timePrepare: { type: Number, default: 15, min: 0 },
    finalRate: { type: Number, default: 0.0 },
    status: { type: String, enum: FoodStatus, default: FoodStatus.normal },
    description: { type: String, required: true },
    price: { type: Number, default: 0.0 }
}, { timestamps: true });
exports.default = mongoose_1.default.model('Food', foodSchema);
