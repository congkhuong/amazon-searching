import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import apiRoute from './route/api';
import responseTime from 'response-time';
import logger from './lib/logger';

/*import errorHandler from './middleware/errorHandler';
import notFoundHandler from './middleware/notFoundHandler';*/

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(responseTime());
app.use('/api', apiRoute);
/*app.use(notFoundHandler());
app.use(errorHandler());*/

const listenPort = process.env.NODE_ENV === 'test' ? 8088 : config.app.port;
export default app.listen(listenPort, () => {
  console.log(`DCC App listening on port ${listenPort}!`); // eslint-disable-line
});

export {
  app,
};
