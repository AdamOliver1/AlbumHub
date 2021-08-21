import { HttpClient } from "@angular/common/http";
import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder } from '@angular/forms';
import {ImageDetailsComponent} from '../image-details/image-details.component';
import {MatDialogModule, MatDialog,MatDialogConfig } from '@angular/material/dialog';
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ImageDialogServiceService} from '../../../../services/image-dialog-service/image-dialog-service.service';
@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements AfterViewInit {

  constructor(private ImageDialogServiceService:ImageDialogServiceService) { }
  fileUploadForm!: FormGroup;
  fileInputLabel!: string;


  WIDTH = window.innerWidth / 2;
  HEIGHT = window.innerHeight / 2;
  WIDTHimgGallary = window.innerWidth / 6;
  HEIGHTimgGallary = window.innerHeight / 6;
  @ViewChild("video")
  public video!: ElementRef;

  @ViewChild("canvas")
  public canvas!: ElementRef;

  captures: string[] = [];
  error: any;
  isCaptured: boolean = false;

  async ngAfterViewInit() {
    await this.setupDevices();
  }


  uploadImage(src:string){
    this.openDialog(src);  
  }

  openDialog(src:string) {
    this.ImageDialogServiceService.openSaveImageDialog(src);
  }

  async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
        if (stream) {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
          this.error = null;
        } else {
          this.error = "You have no output video device";
        }
      } catch (e) {
        this.error = e;
      }
    }
  }

  capture() {

    this.drawImageToCanvas(this.video.nativeElement);
    let url = this.canvas.nativeElement.toDataURL("image/png");
    this.captures.push(url);
    this.isCaptured = true;
   

   
    if (this.captures.length > 4) {
      let btn = <HTMLInputElement>document.getElementById('snap');
      if (btn) {
        btn.innerHTML = "Max 5 Images";
        btn.disabled = true;
      }
      return;
    }
  }

  removeCurrent() {
    this.isCaptured = false;
  }

  setPhoto(idx: number) {
    console.log('setPhoto');

    this.isCaptured = true;
    var image = new Image();
    image.src = this.captures[idx];
    this.drawImageToCanvas(image);
  }

  drawImageToCanvas(image: any) {
    this.canvas.nativeElement
      .getContext("2d")
      .drawImage(image, 0, 0, this.WIDTH, this.HEIGHT);

  }


}

