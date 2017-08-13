// Main server script
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const router = require('./router');
const app = express();

//DB setup
mongoose.connect('mongodb://localhost/auth', {
  useMongoClient: true
});

// App setup (express)
//  -- register middleware
app.use(morgan('combined'));
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
router(app);



// Server setup
const port = process.env.PORT || 9080;
const server = http.createServer(app);
server.listen(port);
console.log(`Server is running on port ${port}`);