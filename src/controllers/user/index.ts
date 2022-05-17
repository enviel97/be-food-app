import { Request, Response } from 'express';
import bcrypt from '../../helpers/bcrypt';
import { statusCode } from '../../helpers/constant';
import { Token } from '../../helpers/token';
import { UserModel } from '../../models';
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
		return res.status(statusCode.success.CREATED).json({
			_id: (result as any)._id.toHexString(),
			name: result.name,
			birth: result.birth,
			gender: result.gender,
			email: result.email,
			avatar: result.avatar
		});
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

export const signin = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	const user = await UserModel.findOne<IUser>({ email })
		.select({
			id: 1,
			password: 1,
			name: 1,
			email: 1,
			avatar: 1,
			gender: 1,
			birth: 1
		})
		.lean();
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
				name: user.name,
				email: user.email,
				avatar: user.avatar,
				gender: user.gender,
				birth: user.birth
			}
		});
	}
	return res
		.status(statusCode.error.NOT_FOUND)
		.json({ message: 'Invalid username or password' });
};

export default {
	createUser,
	readUser,
	updateUser,
	deleteUser,
	signin
};
