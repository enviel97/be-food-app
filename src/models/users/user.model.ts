import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './user.interface';
import bcrypt from '../../helpers/bcrypt';

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
		email: { type: String, required: true, immutable: true, unique: true },
		password: { type: String, required: true, select: false },
		gender: { type: String, enum: UserGender, default: UserGender.female },
		birth: { type: Date, required: true },
		address: { type: String, default: '', ref: 'Address' }
	},
	{ timestamps: true }
);

UserSchema.pre('save', async function (next) {
	let user = this;
	if (this.isModified('password') || this.isNew) {
		const hash = await bcrypt.hash(user.password);
		user.password = hash;
	}
	return next();
});

UserSchema.pre('findOneAndUpdate', async function (next) {
	const update = this.getUpdate();
	const password = (update as any)['password'] ?? undefined;
	if (!!password) {
		const hash = await bcrypt.hash(password);
		this.setUpdate({ password: hash });
	}
});

export default mongoose.model<IUserModel>('User', UserSchema);
