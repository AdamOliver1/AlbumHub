import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Library } from 'src/app/models/libraryModels/library';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ImageService } from 'src/app/services/image-service/image.service';
import { LibraryService } from 'src/app/services/library-service/library.service';
import { ImageDetails } from '../../../models/image';
import { ImageDialogServiceService } from '../../../services/image-dialog-service/image-dialog-service.service';
import { ImageDetailsComponent } from '../upload-images/image-details/image-details.component';

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

  constructor(
    private imageDialogServiceService: ImageDialogServiceService,
    private imageService: ImageService,
    private libraryService: LibraryService,
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private dialogService: ImageDialogServiceService
  ) {



    libraryService.getLibraries().then(data => {
      this.allLibraries = data as Library[];
      this.checkoutForm = this.formBuilder.group({
        library: this.library,
        categories: this.categories,
        title: this.title,

      });
      console.log(" this.allLibrarie", this.allLibraries);

      if (this.allLibraries?.length > 0) {
        this.checkoutForm.controls['library'].setValue(this.allLibraries[0]);
        this.initImages(this.allLibraries[0].library);
      }
    });
  }

  ngOnInit(): void {
    console.log("stateee", window.history.state.data);
    this.onPrivateMode = window.history.state.data ? true : false;
  }

  async getAllPrivate() {
    await this.imageService.getPrivateImages(this.allLibraries).then((data) => {
      this.images = data;
      console.log("this.images", this.images);
    })
  }

  async getAllImages() {
    await this.imageService.getAllImages(this.allLibraries, this.onPrivateMode).then((data) => {
      this.images = data;
      console.log("this.images", this.images);
    })

  }


  async getFavorites() {
    
    console.log("this.onPrivateMode", this.onPrivateMode);

    await this.imageService.getFavoritesImages(this.allLibraries, this.onPrivateMode).then((data) => {
      this.images = data;
      console.log("this.images", this.images);
    })
  }

  openDialog(imageDetails: ImageDetails): void {
    this.imageDialogServiceService.openUpdateImageDialog(imageDetails).subscribe((data) => {
      console.log("data: ", data);

    })

  }

  async initImages(library: string): Promise<any> {
    this.allCategories = this.categoriesService.getCategories();
    await this.imageService.getImagesByLibrary(library, false, this.onPrivateMode).then((data) => {
      this.images = data;
      console.log("this.images", this.images);
    })
  }
  async onSubmit(): Promise<void> {

    await this.initImages(this.checkoutForm.value.library.library)
    console.log("searchhhhh", this.checkoutForm.value);
    this.images = this.imageService.filterImagesByTitleAndCategories(
      this.images,
      this.checkoutForm.value.categories,
      this.checkoutForm.value.title
    )
  }
}