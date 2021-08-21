// // import nodejs bindings to native tensorflow,
// // not required, but will speed up things drastically (python required)
// import '@tensorflow/tfjs-node';
// const express = require('express');
// const router = express.Router();

// // implements nodejs wrappers for HTMLCanvasElement, HTMLImageElement, ImageData
// import * as canvas from 'canvas';

// import * as faceapi from 'face-api.js';

// // patch nodejs environment, we need to provide an implementation of
// // HTMLCanvasElement and HTMLImageElement
// const { Canvas, Image, ImageData } = canvas;
// faceapi.env.monkeyPatch({ Canvas, Image, ImageData })


// const faceapi = require('face-api.js');
// Promise.all([
//   faceapi.nets.tinyFaceDetector.loadFromDisk(__dirname + '/ml-models'),
//   faceapi.nets.faceLandmark68Net.loadFromDisk(__dirname + '/ml-models'),
//   faceapi.nets.faceRecognitionNet.loadFromDisk(__dirname + '/ml-models'),
//   faceapi.nets.faceExpressionNet.loadFromDisk(__dirname + '/ml-models')
// ]).then(() => {console.log("ffff");})

// router.get('/face-api-rec')
const fs = require("fs");
var fileName = "images/home1/test.png";
const path = require('path')

fs.readdir(
  path.resolve("images/home1"),
  (err, files) => {
    if (err) throw err;
    
    let result = {}
    
    for (let file of files) {  
      fs.readFile(`${process.cwd()}/images/home1/${file}`, (err, data)=>{
        
        //error handle
        if(err) res.status(500).send(err);
        
        //get image file extension name
        let extensionName = path.extname(`${process.cwd()}/images/home1/test.png`);
        
        //convert image file to base64-encoded string
        // let base64Image = new Buffer(data, 'binary').toString('base64');
        let base64Image = Buffer.from(data, 'binary').toString('base64');
        
        //combine all strings
        let imgSrcString = `data:image/${extensionName.split('.').pop()};base64,${base64Image}`;
        
        //send image src string into jade compiler
      //  console.log(file);
        result[file] = imgSrcString;
       console.log(result);
      });
    }
    
  }
 
);




