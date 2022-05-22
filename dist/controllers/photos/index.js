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
const mongoose_1 = __importDefault(require("mongoose"));
const gridfs_stream_1 = __importDefault(require("gridfs-stream"));
const constant_1 = require("../../helpers/constant");
const logger_1 = __importDefault(require("../../library/logger"));
let gfs;
let bucket;
const conn = mongoose_1.default.connection;
conn.once('open', function () {
    const bucketName = 'photos';
    bucket = new mongoose_1.default.mongo.GridFSBucket(conn.db, {
        bucketName
    });
    gfs = (0, gridfs_stream_1.default)(conn.db, mongoose_1.default.mongo);
    gfs.collection(bucketName);
    logger_1.default.success('connect gridfs success');
});
const createPhotos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            logger_1.default.error('Empty image');
            return res
                .status(constant_1.statusCode.error.BAD_REQUEST)
                .json({ message: 'You must select image' });
        }
        const uri = `/photos/${req.file.filename}`;
        return res.status(constant_1.statusCode.success.CREATED).json({ uri });
    }
    catch (error) {
        logger_1.default.error('Create image error');
        logger_1.default.error(error);
        res.status(constant_1.statusCode.error.NOT_FOUND).json({ message: 'Not found' });
    }
});
const getPhotos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filename } = req.params;
    try {
        const file = yield gfs.files.findOne({ filename });
        if (!file) {
            return res
                .status(constant_1.statusCode.error.NOT_FOUND)
                .json({ message: 'Image not found' });
        }
        const readStream = bucket.openDownloadStream(file._id);
        readStream.pipe(res);
    }
    catch (error) {
        logger_1.default.error('Get image error');
        logger_1.default.error(error);
        res.status(constant_1.statusCode.error.NOT_FOUND).json({ message: 'Not found' });
    }
});
const deletePhotos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        gfs.remove({ filename: req.params.filename }, () => {
            logger_1.default.success(`Delete image ${req.params.filename}`);
            return res.status(constant_1.statusCode.success.OK).json({ message: 'OK' });
        });
        logger_1.default.error(`Image ${req.params.filename} not found`);
        return res
            .status(constant_1.statusCode.error.NOT_FOUND)
            .json({ message: 'Image not found' });
    }
    catch (error) {
        logger_1.default.error(`Image not found ${req.params.filename}`);
        logger_1.default.error(error);
        return res
            .status(constant_1.statusCode.error.BAD_REQUEST)
            .json({ message: 'An error occured' });
    }
});
exports.default = { createPhotos, getPhotos, deletePhotos };
