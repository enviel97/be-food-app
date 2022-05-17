import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './user.interface';

export enum UserGender {
	male = 'Male',
	female = 'Female',
	private = 'Private'
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
	{
		name: { type: String, required: true },
		avatar: { type: String, default: '' },
		email: { type: String, required: true, immutable: true },
		password: { type: String, required: true, select: false, immutable: true },
		gender: { type: String, enum: UserGender, default: UserGender.female },
		birth: { type: Date, required: true }
	},
	{ timestamps: true }
);

export default mongoose.model<IUserModel>('User', UserSchema);
