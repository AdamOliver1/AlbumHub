import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Library } from 'src/app/models/library';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ImageService } from 'src/app/services/image-service/image.service';
import { LibraryService } from 'src/app/services/library-service/library.service';
import { ImageDetails } from '../../../models/image';
import { ImageDialogService } from '../../../services/image-dialog-service/image-dialog.service';
import { AlertsService } from '../../../services/alerts/alerts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})

export class LibraryComponent implements OnInit {
  categories = new FormControl([]);
  title = new FormControl("");
  library = new FormControl({});
  images: ImageDetails[];
  allLibraries: Library[];
  allCategories: string[];
  checkoutForm: any;
  onPrivateMode: boolean = false;
  // if  the user edits an image, emit the last action
  lastAction: any = () => { };

  constructor(
    private imageDialogService: ImageDialogService,
    private imageService: ImageService,
    private libraryService: LibraryService,
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder,
    private alertsService: AlertsService,
    private router: Router,
  ) {

    // get all libraries
    libraryService.getLibraries().then(data => {
      this.allLibraries = data as Library[];
      this.checkoutForm = this.formBuilder.group({
        library: this.library,
        categories: this.categories,
        title: this.title,

      });

      //set default libraries
      if (this.allLibraries?.length > 0) {
        this.checkoutForm.controls['library'].setValue(this.allLibraries[0]);
        this.initImages(this.allLibraries[0].library);
      }
    });
  }

  ngOnInit(): void {
    this.onPrivateMode = sessionStorage.getItem('privateMode') ? true : false;
  }

  async getAllPrivate() {
    this.lastAction = this.getAllPrivate;
    await this.imageService.getPrivateImages(this.allLibraries).then((data) => {
      this.images = data;
    })
  }

  async getAllImages() {
    this.lastAction = this.getAllImages;
    await this.imageService.getAllImages(this.allLibraries, this.onPrivateMode).then((data) => {
      this.images = data;
    })
  }

  async getFavorites() {
    this.lastAction = this.getFavorites;
    await this.imageService.getFavoritesImages(this.allLibraries, this.onPrivateMode).then((data) => {
      this.images = data;
    })
  }

  async openDialog(imageDetails: ImageDetails) {
    await this.imageDialogService.openUpdateImageDialog(imageDetails).subscribe(() => {
      this.initImages(this.checkoutForm.value.library.library);
    })
  }

  async deleteImage(imageDetails: ImageDetails) {
    await this.alertsService.delete(async () => {
      await this.imageService.deleteImage(imageDetails).then(() => {
        this.lastAction ? this.lastAction() : this.initImages(this.checkoutForm.value.library.library)
      })
    });
  }

  async initImages(library: string): Promise<any> {
    this.allCategories = await this.categoriesService.getCategories();
    await this.imageService.getFilteredImages(library, false, this.onPrivateMode).then((data) => {
      this.images = data;
    })
  }


  async onSubmit(): Promise<void> {
    await this.initImages(this.checkoutForm.value.library.library)
    this.images = this.imageService.filterImagesByTitleAndCategories(
      this.images,
      this.checkoutForm.value.categories,
      this.checkoutForm.value.title
    )
  }

  changeToSlideShow() {
    this.router.navigateByUrl('/slide-show');
  }
}