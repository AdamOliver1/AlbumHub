import { Component, OnInit } from '@angular/core';
import {LibraryService} from '../../../services/library-service/library.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-library',
  templateUrl: './new-library.component.html',
  styleUrls: ['./new-library.component.scss']
})
export class NewLibraryComponent implements OnInit {
  checkoutForm:any; 
  constructor(
    private libraryService:LibraryService,
    private router: Router,
    private formBuilder: FormBuilder,) {
      this.checkoutForm = this.formBuilder.group({
        libraryName:["",Validators.required],
        description:["",Validators.required]            
      });
     }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log("categoriesSelected",this.checkoutForm.value);
   this.libraryService.addNewLibrary(this.checkoutForm.value.libraryName,this.checkoutForm.value.description) 
   this.router.navigateByUrl('/upload-image/camera');
  }
}
