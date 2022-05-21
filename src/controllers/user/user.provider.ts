import { logError } from '../../config/logger_helper';
import Provider from '../../config/provider';
import { UserModel } from '../../models';
import { IUser, UserGender } from '../../models/users/user.interface';

const authProvider: Provider<IUser> = {
	findById: async (id: String) => {
		try {
			const user = await UserModel.findById(id);
			return user;
		} catch (error) {
			throw logError({ message: 'Get user error', error });
		}
	},
	create: async (user: IUser) => {
		const _user = new UserModel({ ...user });

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
			const user = await UserModel.findByIdAndUpdate(id, newObject, {
				new: true
			});
			return user;
		} catch (error) {
			throw logError({ message: 'Create user error', error });
		}
	},
	deleteById: async (id: String) => {
		try {
			const user = await UserModel.findByIdAndDelete(id);
			return user;
		} catch (error) {
			throw logError({ message: 'Delete user error', error });
		}
	},
	findOne: async (search) => {
		try {
			const food = await UserModel.findOne(search).lean();
			return food;
		} catch (error) {
			throw logError({ message: 'Get user error', error });
		}
	},
	updateByAttribute: async (search: any, update: any) => {
		try {
			const user = await UserModel.findOneAndUpdate(search, update, {
				new: true
			}).lean();
			return user;
		} catch (error) {
			throw logError({ message: 'Change password user failure', error });
		}
	}
};

export default authProvider;
