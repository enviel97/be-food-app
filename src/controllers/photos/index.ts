import mongoose from 'mongoose';
import g, { Grid } from 'gridfs-stream';
import { Request, Response } from 'express';
import { statusCode } from '../../helpers/constant';
import logger from '../../library/logger';
import { GridFSBucket } from 'mongodb';

let gfs: Grid;
let bucket: GridFSBucket;
const conn = mongoose.connection;
conn.once('open', function () {
	const bucketName = 'photos';
	bucket = new mongoose.mongo.GridFSBucket(conn.db, {
		bucketName
	});
	gfs = g(conn.db, mongoose.mongo);
	gfs.collection(bucketName);
	logger.success('connect gridfs success');
});

const createPhotos = async (req: Request, res: Response) => {
	try {
		if (!req.file) {
			logger.error('Empty image');
			return res
				.status(statusCode.error.BAD_REQUEST)
				.json({ message: 'You must select image' });
		}
		const uri = `/photos/${req.file.filename}`;
		return res.status(statusCode.success.CREATED).json({ uri });
	} catch (error) {
		logger.error('Create image error');
		logger.error(error);
		res.status(statusCode.error.NOT_FOUND).json({ message: 'Not found' });
	}
};

const getPhotos = async (req: Request, res: Response) => {
	const { filename } = req.params;
	try {
		const file = await gfs.files.findOne({ filename });
		if (!file) {
			return res
				.status(statusCode.error.NOT_FOUND)
				.json({ message: 'Image not found' });
		}
		const readStream = bucket.openDownloadStream(file._id);
		readStream.pipe(res);
	} catch (error) {
		logger.error('Get image error');
		logger.error(error);
		res.status(statusCode.error.NOT_FOUND).json({ message: 'Not found' });
	}
};

const deletePhotos = async (req: Request, res: Response) => {
	try {
		gfs.remove({ filename: req.params.filename }, () => {
			logger.success(`Delete image ${req.params.filename}`);
			return res.status(statusCode.success.OK).json({ message: 'OK' });
		});
		logger.error(`Image ${req.params.filename} not found`);
		return res
			.status(statusCode.error.NOT_FOUND)
			.json({ message: 'Image not found' });
	} catch (error) {
		logger.error(`Image not found ${req.params.filename}`);
		logger.error(error);
		return res
			.status(statusCode.error.BAD_REQUEST)
			.json({ message: 'An error occured' });
	}
};

export default { createPhotos, getPhotos, deletePhotos };
