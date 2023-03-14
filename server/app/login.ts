import express from 'express';
import passport from 'passport';

const router = express.Router();

router.post('/', passport.authenticate('local'), (req, res) => {
  res.status(200).send('Authenticated');
});

export default router;