import { Component, OnInit } from '@angular/core';
import {ImageDialogService} from '../../../../services/image-dialog-service/image-dialog.service';
@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.scss']
})
export class LocalComponent implements OnInit {
  WIDTHimgGallary = window.innerWidth / 6;
  HEIGHTimgGallary = window.innerHeight / 6;
  constructor(private imageDialogService:ImageDialogService) { }

  ngOnInit(): void {
  }
  public imagePath: any;
  imagesURL: any[] = [];
  public message!: string;

  uploadImage(src:string){
    this.imageDialogService.openSaveImageDialog(src); 
  }

  preview(files: any) {
    if (files.length === 0)  return;  
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imagesURL.push(reader.result);
    }
  }

}
