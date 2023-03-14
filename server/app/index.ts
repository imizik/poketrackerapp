import express, { Express, json } from 'express';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import { PrismaClient, User, Pokemon } from '@prisma/client';
import localStrategy from './localStrategy';
import loginRouter from './login';
import pokemonRoutes from './pokemonRoutes';


const app: Express = express();
export const prisma: PrismaClient = new PrismaClient();

app.use(json());
app.use(
  cors({
    credentials: true,
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
  })
);

app.use(
  session({
    secret: 'djr2@$&^42hwwrjhr',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(localStrategy(prisma));

passport.serializeUser(function (user: User, done: any) {
  done(null, user.email);
});

passport.deserializeUser(async (email: string, done: any) => {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      done(null, user);
    } catch (err) {
      done(err);
    }
});

app.use('/login', loginRouter);

app.use('/pokemon', pokemonRoutes);

export default app;