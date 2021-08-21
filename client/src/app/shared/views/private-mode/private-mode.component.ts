import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from "@angular/core";
import { DbService } from '../../../services/db-service/db-service.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { ImageService } from 'src/app/services/image-service/image.service';
import { AlertsService } from 'src/app/services/alerts/alerts.service';

@Component({
  selector: 'app-private-mode',
  templateUrl: './private-mode.component.html',
  styleUrls: ['./private-mode.component.scss']
})
export class PrivateModeComponent implements OnInit {
  passwordFormControl = new FormControl('', [Validators.required]);
  constructor(
    private userService: DbService,
    private router: Router,
    private alertService:AlertsService,
    // private MdDialogRef: MatDialogRef<PrivateModeComponent>,
    private imageService:ImageService,
    
  ) {

  }
  ngOnInit(): void {

  }

  onSubmit() {
    this.userService.checkPassword(this.passwordFormControl.value).then(async (isMatch) => {   
      if (isMatch) {
        console.log("beforeeee");   
      this.router.navigate(['/library'],{state:{data:true}});
      }
      else {
        // this.alertService.simpleAlert();
        alert("Invalid password");
      }         
    })
  }
}
