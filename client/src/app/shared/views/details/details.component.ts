import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {User} from '../../../models/user_model';
import { DbService } from '../../../services/db-service/db-service.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  submitted = false;
//  public privateModeChecked = false;
  checkoutForm:any; 
  ngOnInit(): void {
  }
 
  constructor(
     private formBuilder: FormBuilder,
     private router: Router,
     private dbService: DbService
     ) { 
    this.checkoutForm = this.formBuilder.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",[Validators.required,Validators.email]],
      allowDeviceCamera:false,
      allowDeviceLocation:false,
      allowPrivateMode:false,
      privateModePassword:null       
    });
    
    this.checkoutForm.controls['privateModePassword'].disable();
  }
  privateModeClick(event:MatCheckboxChange){
    if(event.checked) {
      this.checkoutForm.controls['privateModePassword'].enable();
     } else {      
      this.checkoutForm.controls['privateModePassword'].disable();
      }
  }
  get f() { return this.checkoutForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.checkoutForm.invalid) {
        return;
    }

    console.log("categoriesSelected",this.checkoutForm.value);
    this.router.navigateByUrl('/new-library');
    this.dbService.saveUser(this.checkoutForm.value as User)
  }

  
}
