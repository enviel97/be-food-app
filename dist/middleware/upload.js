"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageUploads = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_gridfs_storage_1 = require("multer-gridfs-storage");
const config_1 = require("../config/config");
const logger_1 = __importDefault(require("../library/logger"));
const storage = new multer_gridfs_storage_1.GridFsStorage({
    url: config_1.config.mongo.url,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    file: (req, file) => {
        const match = ['image/png', 'image/jpeg', 'image/jpg'];
        if (!match.includes(file.mimetype)) {
            logger_1.default.error(`File is not image ${file.mimetype}`);
            return {
                bucketName: 'editable',
                filename: `editable_${Date.now()}`
            };
        }
        const fileName = `photos_${Date.now()}`;
        const bucket = {
            bucketName: 'photos',
            filename: fileName
        };
        logger_1.default.success(`Filename: ${fileName}`);
        return bucket;
    }
});
exports.imageUploads = (0, multer_1.default)({ storage });
