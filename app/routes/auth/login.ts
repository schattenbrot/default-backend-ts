import { REFRESH_TOKEN_SECURE } from 'app/config/environment';
import { InternalServerErrorError } from 'app/errors/explerror';
import { passportLocal } from 'app/middlewares/isAuth';
import {
	generateAccessToken,
	generateRefreshToken,
	TokenPayload,
} from 'app/utils/jwtTokens';
import { Handler } from 'express';

const loginHandler: Handler = async (req, res, next) => {
	try {
		const user = req.user!;

		const tokenPayload: TokenPayload = {
			id: user._id,
			email: user.email,
			roles: user.roles,
		};

		const refreshToken = generateRefreshToken(tokenPayload);

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
			secure: REFRESH_TOKEN_SECURE, // Use 'true' if you're serving over HTTPS
			sameSite: REFRESH_TOKEN_SECURE ? 'strict' : 'lax', // Can also be 'Strict' or 'None', depending on your requirements
			// domain: DOMAIN, // The domain for which the cookie is valid
			path: '/', // The path for which the cookie is valid
		});

		const accessToken = generateAccessToken(tokenPayload);

		res.json({
			accessToken,
			user: {
				_id: user._id,
				email: user.email,
				roles: user.roles,
			},
		});
	} catch (err) {
		return next(new InternalServerErrorError());
	}
};

export const post = [passportLocal, loginHandler];
