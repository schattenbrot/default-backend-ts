import {
	ACCESS_TOKEN_SECRET,
	REFRESH_TOKEN_SECRET,
} from 'app/config/environment';
import { Role } from 'app/models/user.model';
import jwt from 'jsonwebtoken';

export interface TokenPayload {
	id: string;
	email: string;
	roles: Role[];
}

export const generateAccessToken = (payload: TokenPayload) => {
	return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
		expiresIn: '15m',
	});
};

export const generateRefreshToken = (payload: TokenPayload) => {
	return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
		expiresIn: '14d',
	});
};

export const revokeRefreshToken = () => {
	return jwt.sign({}, REFRESH_TOKEN_SECRET, {
		expiresIn: '0',
	});
};

export const verifyRefreshToken = (token: string): TokenPayload | null => {
	try {
		const tokenUser = jwt.verify(token, REFRESH_TOKEN_SECRET) as {
			id: string;
			email: string;
			roles: Role[];
			iat: number;
			exp: number;
		};
		return { id: tokenUser.id, email: tokenUser.email, roles: tokenUser.roles };
	} catch (err) {
		return null;
	}
};
