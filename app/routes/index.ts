import { isAuth } from 'app/middlewares/isAuth';
import { Handler } from 'express';

const homeHandler: Handler = async (req, res) => {
	res.send('Home Page');
};

export const get = [isAuth, homeHandler];
