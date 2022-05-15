import { logError } from '../../config/logger_helper';
import Provider from '../../config/provider';
import User, { IUser, UserGender } from '../../models/user.model';

const authProvider: Provider<IUser> = {
	findById: async (id: String) => {
		try {
			const user = await User.findById(id);
			return user;
		} catch (error) {
			throw logError({ message: 'Get user error', error });
		}
	},
	findAll: async (offset: number, limit: number) => {
		try {
			const [users, total] = await Promise.all([
				User.find().skip(offset).limit(limit).lean(),
				User.count()
			]);
			return { limit, offset, total, datas: users };
		} catch (error) {
			throw logError({ message: 'Get users error', error });
		}
	},
	create: async (user: IUser) => {
		const _user = new User({ ...user });

		try {
			const user_1 = await _user.save();
			return user_1;
		} catch (error) {
			throw logError({ message: 'Create user error', error });
		}
	},
	updateById: async (
		id: String,
		newObject: {
			name?: String;
			avatar?: String;
			gender?: UserGender;
			birth?: Date;
		}
	) => {
		try {
			const user = await User.findByIdAndUpdate(id, newObject, {
				new: true
			});
			return user;
		} catch (error) {
			throw logError({ message: 'Create user error', error });
		}
	},
	deleteById: async (id: String) => {
		try {
			const user = await User.findByIdAndDelete(id);
			return user;
		} catch (error) {
			throw logError({ message: 'Create user error', error });
		}
	}
};

export default authProvider;
