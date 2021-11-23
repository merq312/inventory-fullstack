import { auth } from 'express-oauth2-jwt-bearer';
import * as express from 'express';

const router = express.Router();

const checkJwt = auth({
  audience: 'https://mighty-atoll-05391.herokuapp.com/api',
  issuerBaseURL: `https://dev-iukg50h5.us.auth0.com/`,
});

router.get('/private', checkJwt, (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'You are authenticated',
  });
});

router.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Invalid token' });
  }

  next(err, req, res);
});

export default router;
