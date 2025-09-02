import { InternalServerErrorError } from 'app/errors/explerror';
import { isAuth } from 'app/middlewares/isAuth';
import { Handler } from 'express';

const getSelfHandler: Handler = async (req, res, next) => {
	try {
		const user = req.user!;
		res.status(200).json(user);
	} catch (err) {
		next(new InternalServerErrorError());
	}
};

export const get = [isAuth, getSelfHandler];
