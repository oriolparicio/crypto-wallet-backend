import app from './app.js';
import mongoose from 'mongoose';

const db_uri = process.env.DB_STRING.replace(
  '<password>',
  process.env.DB_PASSWORD
);
const api_port = process.env.PORT || 4000;

mongoose
  .connect(db_uri, {})
  .then(() => {
    console.log('┌──────────────────────────────────────┐');
    console.log('| > Connected to the database!         |');
    console.log('└──────────────────────────────────────┘');
  })
  .then(() => {
    return new Promise((resolve, _reject) => {
      app.listen(api_port, resolve);
    });
  })
  .then(() => {
    console.log('┌──────────────────────────────────────┐');
    console.log(`| > HTTP server started on port ${api_port}!  |`);
    console.log('└──────────────────────────────────────┘');
  })
  .catch((error) => {
    console.log(`Failed to start server: ${error.name}: ${error.message}`);
    process.exit(1);
  });

const unexpectedErrorHandler = (error) => {
  console.log('UNCAUGHT ERROR');
  console.log(error.name, error.message);
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
