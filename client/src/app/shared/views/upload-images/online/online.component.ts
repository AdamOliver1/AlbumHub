import { Component, OnInit } from '@angular/core';
import { ImageDialogService } from 'src/app/services/image-dialog-service/image-dialog.service';
import { ImageService } from 'src/app/services/image-service/image.service';
import { PexelService } from 'src/app/services/pexel-images/pexel.service';

@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.scss']
})
export class OnlineComponent implements OnInit {
  search: string;
  numberResults: number;
  images: any[];
  constructor(
    private pexelsService: PexelService,
    private ImageDialogService: ImageDialogService,
    private imagesService:ImageService
  ) { }

  ngOnInit(): void {
  }

  uploadImage(src: any) {
    this.imagesService.toBase64(src, (res: any) => {
      this.ImageDialogService.openSaveImageDialog(res); 
    })
  }

  searchImages() {
    this.pexelsService.getData(this.search, this.numberResults).subscribe((data) => {
      this.images = data.photos;
    })
  }

}
