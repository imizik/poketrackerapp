import { Strategy as LocalStrategy } from 'passport-local';

export default (prisma) => {
  return new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email: string, password: string, done: any) => {
      try {
        const user = await prisma.user.findUnique({ where: { email } });
        console.log(user)
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }

        if (password !== user.password) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        if (!user.isAdmin) {
            return done(null, false, { message: 'Not an Admin.' });
        }

        return done(null, user);
      } catch (err) {
        console.log(err);
        return done(err);
      }
    }
  )
};