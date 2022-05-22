"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_1 = require("../middleware/upload");
const photos_1 = __importDefault(require("../controllers/photos"));
const router = (0, express_1.Router)();
router.post('/upload', upload_1.imageUploads.single('image'), photos_1.default.createPhotos);
router.get('/:filename', photos_1.default.getPhotos);
router.delete('/:filename', photos_1.default.deletePhotos);
exports.default = {
    name: '/photos',
    router
};
