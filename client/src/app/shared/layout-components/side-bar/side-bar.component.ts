import { Component, Input, OnInit } from '@angular/core';

import { UserService } from 'src/app/services/user-service/user.service';
import { ImageDialogService } from '../../../services/image-dialog-service/image-dialog.service';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  @Input()
  toggle:any;
  userExist: any;
  isLibrary:boolean;
  constructor(
    private imageDialogService: ImageDialogService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUser().then(user => {
      this.userExist = user      
       this.isLibrary = user?.template === 'List';
    })  
  }

  toggleSideBar(){
    this.toggle();
  }

  openCategoriesDialog() {
    this.imageDialogService.openCategoriesDialog()
  }

  setRandom(){
    sessionStorage.setItem('random','true');
  }
}
