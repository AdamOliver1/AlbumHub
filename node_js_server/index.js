const app = require('./app');

app.listen(3000, () => {
    console.log('app is up');
})



// Promise.all([
//     faceapi.nets.tinyFaceDetector.loadFromDisk(__dirname + '/ml-models'),
//     faceapi.nets.faceLandmark68Net.loadFromDisk(__dirname + '/ml-models'),
//     faceapi.nets.faceRecognitionNet.loadFromDisk(__dirname + '/ml-models'),
//     faceapi.nets.faceExpressionNet.loadFromDisk(__dirname + '/ml-models'),

// ]).then(() => { console.log("ffff"); })
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

