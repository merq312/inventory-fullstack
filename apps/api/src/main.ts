import * as express from 'express';
import * as path from 'path';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as xss from 'xss-clean';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as rateLimit from 'express-rate-limit';
import productRouter from './routes/productRouter';
import userRouter from './routes/userRouter';

const CLIENT_BUILD_PATH = path.join(__dirname, '../app');

const app = express();
app.enable('trust proxy');

app.use(express.static(CLIENT_BUILD_PATH));

if (process.env.NODE_ENV === 'development') {
  const origin = 'http://localhost:3333';
  app.use(cors({ credentials: true, origin }));
  app.options(origin, cors({ credentials: true, origin }));
} else {
  const origin = 'https://mighty-atoll-05391.herokuapp.com/';
  app.use(cors({ credentials: true, origin }));
  app.options(origin, cors({ credentials: true, origin }));
}

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again later',
});

app.use('/api', limiter);
app.use(
  express.json({
    limit: '10kb',
  })
);
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(xss());
app.use(compression());

app.get('/', (req, res) => {
  res.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
});

app.use('/api/v1/product', productRouter);
// app.use('/api/v1/menu')
// app.use('/api/v1/store')
app.use('/api/v1/user', userRouter);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port);
});
server.on('error', console.error);
