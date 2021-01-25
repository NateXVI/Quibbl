require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

// DEFINE PORT NUMBER
const port = process.env.PORT || 3001;

// IMPORT ROUTES
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const userRoute = require('./routes/user');

// CONNECT TO DATABASE
console.log(process.env.DB_CONNECT);
mongoose
	.connect(process.env.DB_CONNECT, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Connected to database'));

// MIDDLEWARE
app.use(express.json());

// ADD ROUTES TO APP
app.use('/api', registerRoute);
app.use('/api', loginRoute);
app.use('/api', userRoute);

// ADD WEBPAGE

// START SERVER
app.listen(port, () => console.log(`Server started on port ${port}`));
