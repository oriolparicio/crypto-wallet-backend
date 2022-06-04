# Crypto Wallet Backend Documentation

**This is a Prestalo Techical Test.**

## Front End

## Stacks used

- NodeJS
- Express
- Mongoose

This is a NodeJS API connected to MongoDB Database.\

In `/src` we can find App.js and Index.js for the server initialization & using middlewares like Morgan, Cors, Compression, Helmet... Then we have the Routes folder `/src/routes`, where we can find the routers files, in this case we have authRouter & transactionsRouter. From the routes, for protected routes, first we will call the protect action to check if you are authentificated and the token is valid, if your token is not valid, you will receive a 401 code.

Then we call the specific controller that we can find it in the controller folder `/src/controller`. There, we have the functionality of this specific "action", where if we provide the correct information, we will receive the response with a 200 status code.

In `/src/model` folder, we can find all the mongoose Schemas configurated.

In `/src/utils` folder we can find global external function.

We have `/.env` file to manage all the private data like Database connection string & password or JWT configuration.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the API in the development mode with nodemon.\
Running in [http://localhost:4000](http://localhost:4000)

### `npm start`

Runs the API in the development mode with node.\
Running in [http://localhost:4000](http://localhost:4000)
