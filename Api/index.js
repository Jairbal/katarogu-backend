const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const rfs = require('rotating-file-stream');
const app = express();


//VARIABLES DE ENTORNO
const { config } = require('./config/index');
//RUTAS KATAROGUS
const authApi = require('./routes/auth');
const katarogusApi = require('./routes/katarogus');
const productsApi = require('./routes/products');
const usersApi = require('./routes/users');

const { logErrors, wrapErrors, errorHandler } = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})

// helmet - Encabezados http
app.use(helmet());
//CORS
app.use(cors());

//Logger
app.use(morgan('combined', { stream: accessLogStream }))

//BODY PARSER
app.use(express.json());

//Routes
authApi(app);
usersApi(app);
katarogusApi(app);
productsApi(app);

// Catch 404
app.use(notFoundHandler);

//Error middleware
app.use(logErrors);
app.use(wrapErrors)
app.use(errorHandler);

app.listen(config.port, function() {
  console.log(`Listening on http://localhost:${config.port}`)
});