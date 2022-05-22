import { Request, Response } from 'express';
import bcrypt from '../../helpers/bcrypt';
import { statusCode } from '../../helpers/constant';
import { Token } from '../../helpers/token';
import logger from '../../library/logger';
import { UserModel } from '../../models';
import { IUser } from '../../models/users/user.interface';
import { UserGender } from '../../models/users/user.model';

import provider from './user.provider';

// Route create User
const createUser = async (req: Request, res: Response) => {
	const { name, birth, gender, password, email } = req.body;

	let avatar: string = '';
	if (!!req.file) {
		const { bucketName, filename } = req.file;
		avatar = `/${bucketName}/${filename}`;
	}
	try {
		const user: IUser = {
			name: name,
			birth: new Date(birth),
			gender: (UserGender as any)[`${gender}`.toLowerCase()],
			email: email,
			password: password,
			avatar: avatar
		};
		const result = await provider.create!(user);
		return res.status(statusCode.success.CREATED).json({
			_id: (result as any)._id.toHexString(),
			name: result.name,
			birth: result.birth,
			gender: result.gender,
			email: result.email,
			avatar: result.avatar
		});
	} catch (error) {
		logger.error(error);
		if (error instanceof Error && (error as any)?.code == 11000) {
			return res
				.status(statusCode.server_error.INTERNAL_SERVER_ERROR)
				.json({ message: 'Duplicate email' });
		}
		return res
			.status(statusCode.server_error.INTERNAL_SERVER_ERROR)
			.json({ message: 'Server error' });
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
		logger.error(error);
		return res
			.status(statusCode.server_error.INTERNAL_SERVER_ERROR)
			.json({ message: 'Server error' });
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
		logger.error(error);
		return res
			.status(statusCode.server_error.INTERNAL_SERVER_ERROR)
			.json({ message: 'Server error' });
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
		logger.error(error);
		return res
			.status(statusCode.server_error.INTERNAL_SERVER_ERROR)
			.json({ message: 'Server error' });
	}
};

const signin = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	const user = await UserModel.findOne<IUser>({ email }).select({
		_id: 1,
		password: 1,
		name: 1,
		email: 1,
		avatar: 1,
		gender: 1,
		birth: 1,
		updatedAt: 1
	});
	if (!user) {
		return res
			.status(statusCode.error.NOT_FOUND)
			.json({ message: 'Invalid username or password' });
	}
	const id = (user as any)['_id'].toString();
	if (await bcrypt.compare(password, (user.password as string) ?? '')) {
		const token = Token.create(id);
		return res.status(statusCode.success.OK).json({
			token: token,
			user: {
				id: (user as any)['_id'],
				name: user.name,
				email: user.email,
				avatar: user.avatar,
				gender: user.gender,
				birth: user.birth,
				updatedAt: (user as any)['updatedAt']
			}
		});
	}
	return res
		.status(statusCode.error.NOT_FOUND)
		.json({ message: 'Invalid username or password' });
};

const verify = async (req: Request, res: Response) => {
	const { email } = req.body;
	try {
		const result = await provider.findOne!({ email });
		if (!result) {
			return res
				.status(statusCode.success.OK)
				.json({ status: false, message: `${email} not found` });
		}
		return res
			.status(statusCode.success.OK)
			.json({ status: true, message: `${email} found` });
	} catch (error) {
		logger.error(error);
		return res
			.status(statusCode.server_error.INTERNAL_SERVER_ERROR)
			.json({ message: 'Server error' });
	}
};

const changePassword = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	try {
		const result = await provider.updateByAttribute!({ email }, { password });
		if (!result) {
			return res
				.status(statusCode.success.OK)
				.json({ status: false, message: `${email} not found` });
		}
		return res
			.status(statusCode.success.OK)
			.json({ status: true, message: `${email} found` });
	} catch (error) {
		logger.error(error);
		return res
			.status(statusCode.server_error.INTERNAL_SERVER_ERROR)
			.json({ message: 'Server error' });
	}
};

export default {
	createUser,
	readUser,
	updateUser,
	deleteUser,
	signin,
	verify,
	changePassword
};
