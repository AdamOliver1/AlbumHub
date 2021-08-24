import {  Component, OnDestroy, OnInit } from '@angular/core';
import { ImageDetails } from 'src/app/models/image';
import { Library } from 'src/app/models/library';
import { ImageDialogService } from 'src/app/services/image-dialog-service/image-dialog.service';
import { ImageService } from 'src/app/services/image-service/image.service';
import { LibraryService } from 'src/app/services/library-service/library.service';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.scss']
})
export class SlideShowComponent implements OnInit, OnDestroy {
  interval: any;
  onPrivateMode: boolean;
  images: ImageDetails[];
  libraries: Library[];
  slideIndex: number = 1;
  isLoaded: boolean = false;
  constructor(
    private imageService: ImageService,
    private libraryService: LibraryService,
    private imageDialogService: ImageDialogService,
  ) {  }

  
  ngOnDestroy(): void { 
    
    clearInterval(this.interval);
    sessionStorage.removeItem('random');
  }

  ngOnInit(): void {
    let data = sessionStorage.getItem('privateMode');
    this.onPrivateMode = data ? true : false;
    this.libraryService.getLibraries().then(async data => {
      this.libraries = data as Library[];
      this.getAllImages();
      this.setImagesOnInit();
    });
  }

  random(stop:boolean){
    if(stop) clearInterval(this.interval);
    else this.setSliderInterval();
  }

  setSliderInterval() {
    this.images = this.imageService.shuffle(this.images);
    this.interval = setInterval(() => {
      this.plusDivs(1);
    }, 2500)
  }

  //when the images are loaded, show them
  setImagesOnInit() {
    let interval = setInterval(() => {
      if (this.isLoaded) {         
        this.showDivs(this.slideIndex);
        if (sessionStorage.getItem('random')) this.setSliderInterval();
        clearInterval(interval)
      }
    }, 100)
  }

  async getAllImages() {   
    await this.imageService.getAllImages(this.libraries, this.onPrivateMode).then((data) => {
      this.images = data;    
      this.isLoaded = true;
    })
  
  }

  plusDivs(n: number) {
    this.showDivs(this.slideIndex += n);
  }

  async openDialog(imageDetails: ImageDetails) {
    await this.imageDialogService.openUpdateImageDialog(imageDetails).subscribe(() => {
      this.getAllImages();
      this.setImagesOnInit();
    })
  }

  showDivs(n: number) {
    let i;
    let sliders = Array.from(document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>);
    if (n > sliders.length) { this.slideIndex = 1 }
    if (n < 1) { this.slideIndex = sliders.length }
    for (i = 0; i < sliders.length; i++) {
      sliders[i].style.display = "none";
    }
    sliders[this.slideIndex - 1].style.display = "block";
  }
}
