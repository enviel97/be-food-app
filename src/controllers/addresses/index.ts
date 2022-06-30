import { Request, Response } from 'express';
import { statusCode } from '../../helpers/constant';
import provider from './address.provider';

// create
const createAddress = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;
		const { contact_name, contact_phone, coordinates } = req.body;
		const result = await provider.create({
			user: userId,
			contact_name,
			contact_phone,
			coordinates
		});
		return res.status(statusCode.success.OK).json(result);
	} catch (error) {
		return res
			.status(statusCode.server_error.INTERNAL_SERVER_ERROR)
			.json(error);
	}
};
// update
// update default address
const setDefaultAddress = async (req: Request, res: Response) => {
	try {
		const { userId, addressId } = req.params;
		const result = await provider.setDefaultAddress(userId, addressId);
		if (result) {
			return res
				.status(statusCode.success.OK)
				.json({ message: 'Set address default success' });
		}
		return res
			.status(statusCode.error.BAD_REQUEST)
			.json({ message: 'Set address default failure' });
	} catch (error) {
		return res
			.status(statusCode.server_error.INTERNAL_SERVER_ERROR)
			.json(error);
	}
};

// update address
const updateAddress = async (req: Request, res: Response) => {
	try {
		const { addressId } = req.params;
		const { contact_name, contact_phone, coordinates } = req.body;
		const result = await provider.updateById(addressId, {
			contact_name,
			contact_phone,
			'coordinates.longitude': coordinates.longitude,
			'coordinates.latitude': coordinates.latitude
		});
		if (!!result) {
			return res
				.status(statusCode.success.OK)
				.json({ message: 'Update address success' });
		}
		return res
			.status(statusCode.error.BAD_REQUEST)
			.json({ message: 'Update address failure' });
	} catch (error) {
		return res
			.status(statusCode.server_error.INTERNAL_SERVER_ERROR)
			.json(error);
	}
};
// remove
const removeAddress = async (req: Request, res: Response) => {
	try {
		const { userId, addressId } = req.params;
		const result = await provider.deleteAddress(userId, addressId);
		if (!!result) {
			return res
				.status(statusCode.success.OK)
				.json({ message: 'Remove address success' });
		}
		return res
			.status(statusCode.error.BAD_REQUEST)
			.json({ message: 'Remove address failure' });
	} catch (error) {
		return res
			.status(statusCode.server_error.INTERNAL_SERVER_ERROR)
			.json(error);
	}
};

// get with user
const getAddressByUser = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;
		if (!userId) {
			return res
				.status(statusCode.error.BAD_REQUEST)
				.json({ message: 'Invalid user' });
		}
		const result = await provider.findByAttribute({ user: userId });
		return res.status(statusCode.success.OK).json(result);
	} catch (error) {
		return res
			.status(statusCode.server_error.INTERNAL_SERVER_ERROR)
			.json(error);
	}
};

const getAddressById = async (req: Request, res: Response) => {
	try {
		const { addressId } = req.params;
		const result = await provider.findById(addressId);
		if (!!result) return res.status(statusCode.success.OK).json(result);
		return res
			.status(statusCode.error.BAD_REQUEST)
			.json({ message: 'Address is undefine' });
	} catch (error) {
		return res
			.status(statusCode.server_error.INTERNAL_SERVER_ERROR)
			.json(error);
	}
};

const controller = {
	createAddress,
	setDefaultAddress,
	updateAddress,
	removeAddress,
	getAddressByUser,
	getAddressById
};

export default controller;
