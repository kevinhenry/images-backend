'use strict';

// bring in express
const express = require ('express');
const app = express();

// get variagble from a .env
require('dotenv').config();

// allow others to hit our server
const cors = require('cors');
app.use(cors());

// get handlers from their own files
const getImages = require('./handlers/getImages');

// validate that env is working with or
const PORT = process.env.PORT || 3001;

// proof of life
app.get('/proof-of-life', (request, response) => response.send('Proof of Life'));

// get images from unsplash API
app.get('/images', getImages);

// turns server on
app.listen(PORT, console.log(`Listening on port ${PORT}`));