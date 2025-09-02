import { ForbiddenError, UnauthorizedError } from 'app/errors/explerror';
import { generateAccessToken, verifyRefreshToken } from 'app/utils/jwtTokens';
import { Handler } from 'express';

export const get: Handler = async (req, res, next) => {
	try {
		const refreshToken = req.cookies['refreshToken'];
		if (!refreshToken) {
			return next(new ForbiddenError('No refresh token'));
		}
		const user = verifyRefreshToken(refreshToken);
		if (!user) {
			return next(new UnauthorizedError('Invalid refresh token'));
		}
		// Issue a new accessToken
		const accessToken = generateAccessToken(user);
		res.json({ accessToken });
	} catch (err) {
		next(err);
	}
};
