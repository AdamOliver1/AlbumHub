const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require('./routers/userRouter')
const imagesRouter = require('./routers/imageRouter')
const libraryRouter = require('./routers/libraryRouter')


app.use(express.static('public'));
app.use('/images', express.static('images'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(userRouter);
app.use(imagesRouter);
app.use(libraryRouter);
app.use(cors());

module.exports = app;