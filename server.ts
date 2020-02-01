//import libraries
import express from 'express';
import { json } from 'body-parser';
import { config } from 'dotenv';


//import modules and helpers
import createLogger from './src/util/logHelper'

//import services
import createServices from './src/services';

// Create and set up the express application instance
const readEnv = config();

const app: Application = express();

//set up logger
const logger = createLogger(app);

if(!readEnv || readEnv.error) {
  logger.error(':::: EXITING SERVER PROCESS: Error reading .env file ::::');
  process.exit(1);
}


const port = 3070;
const jsonBodyParser = json();
app.use(jsonBodyParser);


//setup services
const services = createServices();
app.use('/v1/', services)


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});