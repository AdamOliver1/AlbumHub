import { Injectable } from '@angular/core';
import * as faceapi from 'face-api.js';
import * as fs from 'fs';
import * as tf from '@tensorflow/tfjs';
import { HttpClient } from '@angular/common/http';
import * as path from 'path';

@Injectable({
  providedIn: 'root'
})
export class FaceDetectionService {
  faceapiServer:any;
  constructor(private httpClient: HttpClient) { console.log(path.dirname);
  }
  saveUser() {
    
    this.httpClient.get('http://localhost:3000/face-api').subscribe((data) => {
      console.log(data);
      this.faceapiServer = data;
    })
  }
  // getModels(callback: { (): any }){
  //   Promise.all([
  //     faceapi.nets.tinyFaceDetector.loadFromDisk(__dirname + '/ml-models'),
  //     faceapi.nets.faceLandmark68Net.loadFromDisk(__dirname + '/ml-models'),
  //     faceapi.nets.faceRecognitionNet.loadFromDisk(__dirname + '/ml-models'),
  //     faceapi.nets.faceExpressionNet.loadFromDisk(__dirname + '/ml-models'),
      
  // ]).then(() => {
  //    console.log("ffff"); 
  //    callback();
  //   })
   
      
  
  // }

}
