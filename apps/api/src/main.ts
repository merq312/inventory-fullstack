import * as express from 'express';
import * as path from 'path';
import { Message } from '@inventory-fullstack/api-interfaces';

const app = express();
const CLIENT_BUILD_PATH = path.join(__dirname, '../app');

const greeting: Message = { message: 'Welcome to api!' };

app.get('/api', (req, res) => {
  res.send(greeting);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port);
});
server.on('error', console.error);
