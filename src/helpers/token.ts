import { sign, verify as nVerify, decode as nDecode } from 'jsonwebtoken';
import { config } from '../config/config';

const encode = (data: string): string | object => {
	const token = sign({ data }, config.server.key, {
		issuer: 'com.auth',
		expiresIn: '365d',
		algorithm: 'HS256'
	});

	return token;
};

export const Token = {
	create: encode
};
