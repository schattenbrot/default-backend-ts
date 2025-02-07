import { NODE_ENV } from 'app/config/environment';
import { ErrorRequestHandler } from 'express';
import { Explerror } from './customError';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	if (NODE_ENV !== 'production') {
		console.log(err);
	}

	if (err instanceof Explerror) {
		return res.status(err.status).json({
			errors: [{ msg: err.message }],
		});
	}
	return res.status(500).json({
		errors: [{ msg: 'Internal Server Error' }],
	});
};

export default errorHandler;
