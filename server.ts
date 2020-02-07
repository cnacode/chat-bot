//import libraries
import express from 'express';
import { json } from 'body-parser';
import { config } from 'dotenv';
import cors from 'cors';


//import modules and helpers
import createLogger from './src/util/logHelper'

//import services
import createServices from './src/services';

// Create and set up the express application instance
const readEnv = config();
const app: Application = express();
//set up logger
const logger = createLogger(app);

//check integrity of env
if(!readEnv || readEnv.error) {
  logger.error(':::: EXITING SERVER PROCESS: Error reading .env file ::::');
  process.exit(1);
}

const jsonBodyParser = json();
app.use(jsonBodyParser);
app.use(cors());


app.use((req: APIRequest, res: APIResponse, next: APINext) => {
  console.log('request to ', req.path);
  next();
})

//setup services
const services = createServices();
app.use('/v1', services)


// create basic error middleware
const errorHandlerMiddleware = (err: Error, req: APIRequest, res: APIResponse, next: APINext) => {
  if(!err) err = new Error('Unknown error has happened, the incident has been reported, please try again later');
  logger.error('Unknown error has heppened', {
    data: {
      body: req.body,
      path: req.path,
      params: req.params,
      error: err,
    }
  })
  res.status(500).send(err.message);
}

app.use(errorHandlerMiddleware);

const port = process.env['API_PORT'];

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});