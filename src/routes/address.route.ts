import { Router } from 'express';
import controller from '../controllers/addresses';

const router = Router();
router.get('/:userId/list', controller.getAddressByUser);
router.get('/:addressId', controller.getAddressById);
router.patch('/:userId/default/:addressId', controller.setDefaultAddress);
router.patch('/update/:addressId', controller.updateAddress);
router.delete('/:userId/delete/:addressId', controller.removeAddress);
router.post('/:userId/create', controller.createAddress);

export default {
	name: '/address',
	router
};
