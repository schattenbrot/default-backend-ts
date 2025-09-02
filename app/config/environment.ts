type Env = 'production' | 'development';

type Environment = {
	NODE_ENV: Env;
	DOMAIN: string;
	PORT: number;
	MONGO_URI: string;
	ACCESS_TOKEN_SECRET: string;
	REFRESH_TOKEN_SECRET: string;
	REFRESH_TOKEN_SECURE: boolean;
	CORS_ORIGIN: string[];
};

const NODE_ENV: Env = (process.env.NODE_ENV as Env) || 'development';
const DOMAIN = process.env.DOMAIN || 'localhost';
const PORT = parseInt(process.env.PORT || '8080');
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/basic';
const ACCESS_TOKEN_SECRET =
	process.env.ACCESS_TOKEN_SECRET || 'supersecretpassword';
const REFRESH_TOKEN_SECRET =
	process.env.REFRESH_TOKEN_SECRET || 'supersecretrefresh';
const REFRESH_TOKEN_SECURE =
	(process.env.REFRESH_TOKEN_SECURE || 'false').toLowerCase() === 'true';
const CORS_ORIGIN = (
	process.env.CORS_ORIGIN || 'http://localhost:4200 http://localhost:3000'
).split(' ');

export const environment: Environment = {
	NODE_ENV,
	DOMAIN,
	PORT,
	MONGO_URI,
	ACCESS_TOKEN_SECRET,
	REFRESH_TOKEN_SECRET,
	REFRESH_TOKEN_SECURE,
	CORS_ORIGIN,
};

export {
	ACCESS_TOKEN_SECRET,
	CORS_ORIGIN,
	DOMAIN,
	MONGO_URI,
	NODE_ENV,
	PORT,
	REFRESH_TOKEN_SECRET,
	REFRESH_TOKEN_SECURE,
};
