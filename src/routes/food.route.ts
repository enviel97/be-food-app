import { Router } from 'express';
import controller from '../controllers/food';

const router = Router();
router.get('/get/popular', controller.getPopularFood);
router.get('/get/common', controller.getCommon);
router.get('/get', controller.getFoods);
router.get('/get/:foodId', controller.getFood);

export default {
	name: '/food',
	router
};
