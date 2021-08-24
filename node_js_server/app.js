const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require('./routers/userRouter')
const imagesRouter = require('./routers/imageRouter')
const categoriesRouter = require('./routers/categoriesRouter')
const libraryRouter = require('./routers/libraryRouter')
const jsonService = require('./services/jsonService');
const { categoriesDbPath, imagesDbPath, usersDbPath, libraryDbPath, errorLoggerPath } = require('./config');
const dotenv = require("dotenv");
dotenv.config();

//middlewares for saving images
app.use(express.static('public'));
app.use('/images', express.static('images'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

//routes
app.use(userRouter);
app.use(imagesRouter);
app.use(libraryRouter);
app.use(categoriesRouter);
app.use(cors());

//unknown url
app.use('*', (req, res) => {
    res.status(404).json({
        success: 'false',
        message: 'Page not found',
        error: {
            statusCode: 404,
            message: 'You reached a route that is not defined on this server',
        },
    });
});

//check that all the db json files exist
const check = async () => {
    await jsonService.createFileIfNotExist(categoriesDbPath, { array: [] });
    await jsonService.createFileIfNotExist(imagesDbPath, { array: [] });
    await jsonService.createFileIfNotExist(libraryDbPath, { array: [] });
    await jsonService.createFileIfNotExist(usersDbPath);
    await jsonService.createFileIfNotExist(errorLoggerPath, { array: [] });
}
check();

//handling errors
app.use((error, req, res, next) => {
    console.log("errr");
    res.status(error.status || 500);
    res.json({
        error: {
            message: error?.message
        }
    })
})



module.exports = app;