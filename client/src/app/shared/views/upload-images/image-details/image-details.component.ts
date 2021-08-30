import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CategoriesService } from '../../../../services/categories/categories.service';
import { UserService } from '../../../../services/user-service/user.service';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { LibraryService } from 'src/app/services/library-service/library.service';
import { Library } from 'src/app/models/library';
import { ImageDialogService } from 'src/app/services/image-dialog-service/image-dialog.service';
import { LocationCoords } from 'src/app/models/locationCoords';
import { ImageService } from 'src/app/services/image-service/image.service';
import { AlertsService } from 'src/app/services/alerts/alerts.service';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.scss']
})

export class ImageDetailsComponent implements OnInit {
  imgSrc: string;
  categories = new FormControl([]);
  allCategories: string[];
  allLibraries: any[];
  checkoutForm: any;
  isPrivateModeChecked: boolean = false;
  isFavorite: boolean;
  isPrivateMode: boolean;
  isUpdate: boolean;
  isBtnDisabled: boolean;
  location: LocationCoords;

  constructor(
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder,
    private MdDialogRef: MatDialogRef<ImageDetailsComponent>,
    private libraryService: LibraryService,
    private imageDialogService: ImageDialogService,
    private imageService: ImageService,
    private alertService: AlertsService,
    private userservice: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.location = new LocationCoords();
    this.libraryService.getLibraries().then((data) => {
      this.allLibraries = data as Library[];
    })

    this.isUpdate = this.data?.fileName ? true : false;
    this.isBtnDisabled = !this.isUpdate;
    this.imgSrc = data.imgSrc;

    this.checkoutForm = this.formBuilder.group({
      fileName: data.fileName,
      imgSrc: data.imgSrc,
      caption: new FormControl("", [Validators.required, Validators.maxLength(20)]),
      categories: this.categories,
      isFavorite: this.isFavorite,
      inPrivateMode: false,
      library: new FormControl("", [Validators.required]),
      location: this.location
    });
    (async () => { this.allCategories = await this.categoriesService.getCategories(); })()
  }

  get caption() { return this.checkoutForm.get('caption'); }
  get library() { return this.checkoutForm.get('library'); }

  ngOnInit(): void {
    if (this.isUpdate) {
      this.checkoutForm.controls['library'].setValue(this.data?.library);
      this.checkoutForm.controls['categories'].setValue(this.data?.categories);
      this.checkoutForm.controls['caption'].setValue(this.data?.caption);
      if (this.data?.isFavorite) this.starClick();
      if (this.data?.inPrivateMode) {
        this.isPrivateModeChecked = this.data?.inPrivateMode;
        this.checkoutForm.controls['inPrivateMode'].setValue(true);
      }
      this.checkoutForm.controls['location'].setValue(this.data?.location);
      this.location = this.data?.location;
    }
    else {
      this.userservice.getUser().then(user => {
        if (user?.allowDeviceLocation){
          navigator.geolocation.getCurrentPosition(pos => {
            this.location.lat = pos.coords.latitude;
            this.location.lng = pos.coords.longitude;
          })
        }
        else {
          this.location.lat = 0;
          this.location.lng = 0;
        }
      })
    
    }
  }

  toggle(event: MatSlideToggleChange) {
    this.checkoutForm.controls['inPrivateMode'].setValue(event.checked);
  }

  onOpenGoogleMapsDialog() {
    this.imageDialogService.openGoogleMapsDialog(this.location).subscribe(data => {
      if (data) {
        this.location = data;
        this.checkoutForm.controls['location'].setValue(data);
      }
    })
  }

  libraryChosen() {
    this.isBtnDisabled = false;
  }

  starClick() {
    const star = document.getElementById('star')
    if (this.isFavorite) star?.classList.remove('star');
    else star?.classList.add('star');
    this.isFavorite = !this.isFavorite;
    this.checkoutForm.controls['isFavorite'].setValue(this.isFavorite);
  }

  async onSubmit(): Promise<void> {

    if (this.checkoutForm.valid) {
      if (this.isUpdate) await this.imageService.updateImage(this.checkoutForm.value);
      else await this.imageService.saveImage(this.checkoutForm.value);
      this.alertService.alertWithSuccess(`image ${this.isUpdate ? "updated " : "saved "} seccesfully`);
      this.MdDialogRef.close();
    }
    else this.alertService.alertWithSuccess(`${this.isUpdate ? "Update " : "Saving "} Failed`)
  }
}
