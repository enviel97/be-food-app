import { Request, Response } from 'express';
import { DEFAULT } from '../../config/constant';
import { statusCode } from '../../helpers/constant';
import { IUser } from '../../models/users/user.interface';
import { UserGender } from '../../models/users/user.model';

import provider from './user.provider';

// Route create User
const createUser = async (req: Request, res: Response) => {
	const { name, birth, gender, password, avatar, email } = req.body;

	try {
		const User: IUser = {
			name: name,
			birth: new Date(birth),
			gender: (UserGender as any)[`${gender}`.toLowerCase()],
			email: email,
			password: password,
			avatar: avatar ?? ''
		};
		const result = await provider.create!(User);
		return res.status(statusCode.success.CREATED).json(result);
	} catch (error) {
		return res
			.status(statusCode.server_error.INTERNAL_SERVER_ERROR)
			.json(error);
	}
};

// Route read User
const readUser = async (req: Request, res: Response) => {
	const id = req.params.userId ?? '';
	try {
		const result = await provider.findById!(id);
		if (!result)
			return res
				.status(statusCode.error.NOT_FOUND)
				.json({ message: 'Not found' });
		return res.status(statusCode.success.OK).json(result);
	} catch (error) {
		return res
			.status(statusCode.server_error.INTERNAL_SERVER_ERROR)
			.json(error);
	}
};

// Route get all User
const readAll = async (req: Request, res: Response) => {
	try {
		const offset = Number(req.query.offset) || DEFAULT.OFFSET;
		const limit = Number(req.query.limit) || DEFAULT.LIMIT;
		const result = await provider.findAll!(offset, limit);

		return res.status(statusCode.success.OK).json(result);
	} catch (error) {
		return res
			.status(statusCode.server_error.INTERNAL_SERVER_ERROR)
			.json(error);
	}
};

// Route update User
const updateUser = async (req: Request, res: Response) => {
	const id = req.params.userId ?? '';
	const { name, birth, gender, avatar } = req.body;
	try {
		const result = await provider.updateById!(id, {
			name: name,
			birth: birth,
			gender: gender,
			avatar: avatar
		});
		if (!result)
			return res
				.status(statusCode.error.NOT_FOUND)
				.json({ message: 'Not found' });

		return res.status(statusCode.success.OK).json(result);
	} catch (error) {
		return res
			.status(statusCode.server_error.INTERNAL_SERVER_ERROR)
			.json(error);
	}
};

// Route delete User
const deleteUser = async (req: Request, res: Response) => {
	const id = req.params.userId ?? '';
	try {
		const result = await provider.deleteById!(id);
		if (!result)
			return res
				.status(statusCode.error.NOT_FOUND)
				.json({ message: 'Not found' });
		return res.status(statusCode.success.OK).json(result);
	} catch (error) {
		return res
			.status(statusCode.server_error.INTERNAL_SERVER_ERROR)
			.json(error);
	}
};

export default {
	createUser,
	readUser,
	readAll,
	updateUser,
	deleteUser
};
