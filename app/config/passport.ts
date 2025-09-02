// Passport configuration file
import { ACCESS_TOKEN_SECRET } from 'app/config/environment';
import { User } from 'app/models/user.model';
import passport from 'passport';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';

// Local Strategy for username and password authentication
passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
		},
		async (email, password, done) => {
			try {
				const user = await User.findOne({ email });
				if (!user) {
					return done(null, false, { message: 'Incorrect email or password.' });
				}
				const isMatch = await user.comparePassword(password);
				if (!isMatch) {
					return done(null, false, { message: 'Incorrect email or password.' });
				}
				return done(null, user);
			} catch (error) {
				return done(error);
			}
		},
	),
);

// JWT Strategy can be added here similarly
passport.use(
	new JWTStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: ACCESS_TOKEN_SECRET,
		},
		async (jwtPayload, done) => {
			try {
				const user = await User.findById(jwtPayload.id);
				if (user) {
					return done(null, user);
				} else {
					return done(null, false);
				}
			} catch (error) {
				return done(error, false);
			}
		},
	),
);

export default passport;
