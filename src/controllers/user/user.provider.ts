import { Model, Document } from 'mongoose';
import Provider from '../../config/provider';
import { UserModel } from '../../models';
import { IUser } from '../../models/users/user.interface';

class AuthProvider extends Provider<IUser> {
	constructor() {
		super(UserModel as Model<IUser & Document>);
	}
}

export default new AuthProvider();
