import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
// import Swal from 'sweetalert2/dist/sweetalert2.js';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor() { }
  simpleAlert(){
    Swal.fire('Hello world!');
  }
  
  alertWithSuccess(){
    Swal.fire('Thank you...', 'You submitted succesfully!', 'success')
  }
  
}

