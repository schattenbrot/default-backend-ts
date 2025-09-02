import passport from 'app/config/passport';

const passportLocal = passport.authenticate('local', { session: false });
const isAuth = passport.authenticate('jwt', { session: false });

export { isAuth, passportLocal };
