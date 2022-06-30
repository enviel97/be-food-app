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
	address?: String;
}
