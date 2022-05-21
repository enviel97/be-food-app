import { Router } from 'express';
import controller from '../controllers/user';
import { imageUploads } from '../middleware/upload';

const router = Router();
router.get('/get/:userId', controller.readUser);
router.patch(
	'/update/:userId',
	imageUploads.single('avatar'),
	controller.updateUser
);
router.delete('/delete/:userId', controller.deleteUser);
router.post('/create', imageUploads.single('avatar'), controller.createUser);
router.post('/signin', controller.signin);
router.post('/verify', controller.verify);
router.post('/change_passord', controller.changePassword);

export default {
	name: '/user',
	router
};
