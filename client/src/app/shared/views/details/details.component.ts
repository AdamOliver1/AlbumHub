import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../models/user_model';
import { UserService } from '../../../services/user-service/user.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { AlertsService } from '../../../services/alerts/alerts.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  submitted = false;
  isPrivte: boolean = false;
  templates:string[];
  selected:string;
  isList:FormControl;
  checkoutForm: any;
  ngOnInit(): void {
    this.isList = new FormControl(true);
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertsService: AlertsService
  ) {
    //default templates
    this.templates = ['Grid','List'];
    this.selected = this.templates[1];

    this.checkoutForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      allowDeviceCamera: false,
      allowDeviceLocation: false,
      allowPrivateMode: false,
      privateModePassword: null,
      template:'List'
    });
    this.checkoutForm.controls['privateModePassword'].disable();
  }

  privateModeClick(event: MatCheckboxChange) {
    if (event.checked) {
      this.checkoutForm.controls['privateModePassword'].enable();
      this.isPrivte = true;
    } else {
      this.checkoutForm.controls['privateModePassword'].disable();
      this.isPrivte = false;
    }
  }
  get form() { return this.checkoutForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.checkoutForm.invalid) return;
    if (this.isPrivte && this.checkoutForm.controls['privateModePassword'].value == null) {
      this.alertsService.alertWithError("You must fill the private mode password!");
      return
    }
    this.alertsService.alertWithSuccess('Sign Up Successfully')
    this.userService.saveUser(this.checkoutForm.value as User)
    this.router.navigateByUrl('/new-library');
  }


}
