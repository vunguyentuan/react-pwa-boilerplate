import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import universalLoader from './universal';
// import index from './routes/index'

const app = express();

// Support Gzip
app.use(compression());

// Suport post requests with body data (doesn't support multipart, use multer)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup logger
app.use(morgan('combined'));

// app.use('/', index)

// Serve static assets
app.use(express.static(path.resolve('./build/frontend')));

// const api = require('./routes/api')
// app.use('/api', api)

// Always return the main index.html, so react-router render the route in the client
app.use('/', universalLoader);

export default app;
