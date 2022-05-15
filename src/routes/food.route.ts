import { Router } from 'express';
import controller from '../controllers/food';

const router = Router();
router.get('/get/:foodId', controller.getFood);
router.get('/get/popular', controller.getPopularFood);
router.get('/get/getRegulation', controller.getRegulation);
// https://www.freecodecamp.org/news/gridfs-making-file-uploading-to-mongodb/
export default {
	name: '/food',
	router
};
