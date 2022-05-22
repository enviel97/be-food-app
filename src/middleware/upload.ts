/** User Gridfs to strore media file
 *  Tutorial: https://www.youtube.com/watch?v=XCRUzPi0X0Q - 2021
 */

import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import { config } from '../config/config';
import logger from '../library/logger';

const storage = new GridFsStorage({
	url: config.mongo.url,
	options: {
		useNewUrlParser: true,
		useUnifiedTopology: true
	},
	file: (req, file) => {
		const match = ['image/png', 'image/jpeg', 'image/jpg'];
		if (!match.includes(file.mimetype)) {
			logger.error(`File is not image ${file.mimetype}`);
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
		logger.success(`Filename: ${fileName}`);
		return bucket;
	}
});

export const imageUploads = multer({ storage });
