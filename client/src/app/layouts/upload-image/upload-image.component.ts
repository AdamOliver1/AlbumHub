import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  isLibrary:boolean;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUser().then(user => {     
       this.isLibrary = user?.template === 'List';
    })
  }
}
