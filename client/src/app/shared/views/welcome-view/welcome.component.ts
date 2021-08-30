import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user_model';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  user: string;
  context: string;
  constructor(
    private userService: UserService
  ) {
    try {
 
      this.userService.getUser().then(user => {
        console.log("user", user);

        this.user = user ? user.firstName : '';
        this.context = user ? 'Update details' : "Signup";

      })
    } catch (err) {
      console.log("err", err);

    }
  }
  ngOnInit(): void {

  }
}
