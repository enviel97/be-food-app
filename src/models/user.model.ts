import mongoose, { Document, Schema } from 'mongoose';

export enum UserGender {
	male = 'Male',
	female = 'Female',
	private = 'Private'
}

export interface IUser {
	name: String;
	avatar?: String;
	email: String;
	password: String;
	gender: UserGender;
	birth: Date;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
	{
		name: { type: String, required: true },
		avatar: { type: String, default: '' },
		email: { type: String, required: true, immutable: true },
		password: { type: String, required: true, select: false, immutable: true },
		gender: { type: String, enum: UserGender, default: 1 },
		birth: { type: Date, required: true }
	},
	{ timestamps: true }
);

export default mongoose.model<IUserModel>('User', UserSchema);
