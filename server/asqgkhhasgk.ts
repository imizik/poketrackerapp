import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session"

const prisma = new PrismaClient();
const app = express();
const port = 3001;

// Configure passport to use a local strategy for authentication
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }

        if (password !== user.password) {
          return done(null, false, { message: "Incorrect password." });
        }


        return done(null, user);
      } catch (err) {
        console.log(err)
        return done(err);
      }
    }
  )
);

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, {
      id: user.id,
      username: user.username,
      picture: user.picture
    });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

app.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).send("Authenticated");
});

// Middleware to check if user is authenticated and an admin
const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isAdmin) {
    return next();
  }
  console.log(req.isAuthenticated(), req.user)
  res.status(401).send("Unauthorized");
};



// Endpoint to create a new pokemon
app.post("/pokemon", isAdmin, async (req, res) => {
  const { name, dex_number, type_1, type_2, image_url } = req.body;

  try {
    const pokemon = await prisma.pokemon.create({
      data: {
        name,
        dex_number,
        type_1,
        type_2,
        image_url,
      },
    });

    res.json(pokemon);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Endpoint to modify a pokemon
app.put("/pokemon/:id", isAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, dex_number, type_1, type_2, image_url } = req.body;

  try {
    const pokemon = await prisma.pokemon.update({
      where: { id: parseInt(id) },
      data: {
        name,
        dex_number,
        type_1,
        type_2,
        image_url,
      },
    });

    res.json(pokemon);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Endpoint to delete a pokemon
app.delete("/pokemon/:id", isAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const pokemon = await prisma.pokemon.delete({
      where: { id: parseInt(id) },
    });

    res.json(pokemon);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});