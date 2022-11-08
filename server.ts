import express from 'express';
import morgan from 'morgan';
import connect from './database/databaseConnection';
import cors from 'cors';
import routes from './routes/index';
import dotenv from 'dotenv';
import logger from './config/logger';
import {Request, Response, Application} from 'express';



const app: Application = express();

// HTTP request logger middleware for node.js
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Connecting to the remote Database:
connect.connectDB();

app.use(cors());
app.use("/stripe", express.raw({ type: "*/*" }));
// Form data parsing
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json({ limit: "50mb" }));

// Adding the configured routes to the application.
app.use(routes);

/*
 * * Server Setup
 * The application can run a separate test environment on a different port
 * This is an advantage to run the application and run test command at the same time
 * using different ports.
 */

if(process.env.NODE_ENV === "test"){
  app.listen(process.env.PORT_TEST, function (req?:Request, res?:Response) {
    logger.log('info',
      `Server started at port ${process.env.PORT_TEST} and running in ${process.env.NODE_ENV} environment.`
    );
  });
}
// Development and Production Port
else{
  app.listen(process.env.PORT, function (req?:Request, res?:Response) {
    logger.log('info',
      `Server started at port ${process.env.PORT} and running in ${process.env.NODE_ENV} environment.`
    );
  });
}


export default  app;