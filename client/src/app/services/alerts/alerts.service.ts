import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
// import Swal from 'sweetalert2/dist/sweetalert2.js';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor() { }
  
  
  alertWithError(data:string){
    Swal.fire(data, 'error')
  }
  alertWithSuccess(data:string){
    Swal.fire(data, 'success')
  }

  delete(callback: () => void,data:any = undefined){
    Swal.fire({
      title: `Are you sure ${ data != undefined ? `you want to delete ${data}?` : '?'}` ,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async(result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Deleted Successfully!',
          'success'
        )     
      await callback();
      }    
    }) 
  }
}

 