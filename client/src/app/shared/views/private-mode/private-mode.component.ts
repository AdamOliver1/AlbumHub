import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from "@angular/core";
import { UserService } from '../../../services/user-service/user.service';
import { Router } from '@angular/router';
import { ImageService } from 'src/app/services/image-service/image.service';
import { AlertsService } from 'src/app/services/alerts/alerts.service';

@Component({
  selector: 'app-private-mode',
  templateUrl: './private-mode.component.html',
  styleUrls: ['./private-mode.component.scss']
})

export class PrivateModeComponent implements OnInit {
  passwordFormControl = new FormControl('', [Validators.required]);
  isLibrary: boolean;

  constructor(
    private userService: UserService,
    private router: Router,
    private alertService: AlertsService,
    private imageService: ImageService,

  ) {

  }

  ngOnInit(): void {
    this.userService.isUserExict().then(user => {
      this.isLibrary = user?.template === 'List';
    })
    if (sessionStorage.getItem('privateMode')) {
      console.log("onnnnnnnnnnnnnnn");
      sessionStorage.clear();
      this.router.navigate(['/'], { state: { data: false } });
    }
  }

  onSubmit() {
    this.userService.checkPassword(this.passwordFormControl.value).then(async (isMatch) => {
      if (isMatch) {
        sessionStorage.setItem('privateMode', "ok");
        if (this.isLibrary) this.router.navigate(['/library']);
        else this.router.navigate(['/slide-show']);
      }
      else this.alertService.alertWithError("Invalid Password!")
    })
  }
}
