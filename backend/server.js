require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');

// DEFINE PORT NUMBER
const port = process.env.PORT || 3001;

// IMPORT ROUTES
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const userRoute = require('./routes/user');
const postRoute = require('./routes/post');
const followRoute = require('./routes/follow');
const feedRoute = require('./routes/feed');
const bioRoute = require('./routes/bio');

// CONNECT TO DATABASE
mongoose
	.connect(process.env.DB_CONNECT, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Connected to database'));

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// ADD ROUTES TO APP
app.use('/api', registerRoute);
app.use('/api', loginRoute);
app.use('/api', userRoute);
app.use('/api', postRoute);
app.use('/api', followRoute);
app.use('/api', feedRoute);
app.use('/api', bioRoute);

// ADD WEBPAGE

// START SERVER
app.listen(port, () => console.log(`Server started on port ${port}`));
