import { Router } from 'express';
import { imageUploads } from '../middleware/upload';
import controller from '../controllers/photos';

const router = Router();

/** Photos route*/
router.post('/upload', imageUploads.single('image'), controller.createPhotos);

router.get('/:filename', controller.getPhotos);

router.delete('/:filename', controller.deletePhotos);

export default {
	name: '/photos',
	router
};
