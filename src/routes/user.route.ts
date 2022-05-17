import { Router } from 'express';
import controller from '../controllers/user';

const router = Router();
router.get('/get/:userId', controller.readUser);
router.patch('/update/:userId', controller.updateUser);
router.delete('/delete/:userId', controller.deleteUser);
router.post('/create', controller.createUser);
router.post('/signin', controller.signin);

export default {
	name: '/user',
	router
};
