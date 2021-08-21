import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CategoriesService } from '../../../../services/categories/categories.service';
import { DbService } from '../../../../services/db-service/db-service.service';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { ImageDetails } from '../../../../models/image';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { LibraryService } from 'src/app/services/library-service/library.service';
import { Library } from 'src/app/models/libraryModels/library';
@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.scss']
})

export class ImageDetailsComponent implements OnInit {
  imgSrc!: string;
  categories = new FormControl([]);
  // caption = new FormControl("");
  // library = new FormControl();
  allCategories: string[];
  allLibraries: any[];
  checkoutForm: any;
  isPrivateModeChecked: boolean = false;
  isFavorite: boolean;
  isPrivateMode: boolean;
  isUpdate: boolean;

  constructor(
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder,
    private dbService: DbService,
    private MdDialogRef: MatDialogRef<ImageDetailsComponent>,
    private libraryService: LibraryService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.libraryService.getLibraries().then((data) => {
      this.allLibraries = data as Library[];
    })
    console.log("data", this.data);
    this.isUpdate = this.data?.fileName ? true : false;
    this.imgSrc = data.imgSrc;
    this.checkoutForm = this.formBuilder.group({
      fileName: data.fileName,
      imgSrc: data.imgSrc,
      caption: new FormControl("", [Validators.required, Validators.maxLength(20)]),
      categories: this.categories,
      isFavorite: this.isFavorite,
      inPrivateMode: false,
      library: new FormControl("", [Validators.required]),
      // location:{},

    });

    this.allCategories = this.categoriesService.getCategories();
  }

  get caption() { return this.checkoutForm.get('caption'); }
  get library() { return this.checkoutForm.get('library'); }

  ngOnInit(): void {
    if (this.isUpdate) {
      this.checkoutForm.controls['library'].setValue(this.data?.library);
      this.checkoutForm.controls['categories'].setValue(this.data?.categories);
      this.checkoutForm.controls['caption'].setValue(this.data?.caption);
      document.getElementById('btn')?.classList.add('update');
      if (this.data?.isFavorite) this.starClick();
      if (this.data?.inPrivateMode) {
        this.isPrivateModeChecked = this.data?.inPrivateMode;
        this.checkoutForm.controls['inPrivateMode'].setValue(true);
      }

    }
    else document.getElementById('btn')?.classList.add('add')
  }

  toggle(event: MatSlideToggleChange) {
    this.checkoutForm.controls['inPrivateMode'].setValue(event.checked);
  }

  starClick() {
    console.log("starrr");
    const star = document.getElementById('star')
    if (this.isFavorite) {
      star?.classList.remove('star');
    }
    else {
      star?.classList.add('star');

    }
    this.isFavorite = !this.isFavorite;
    this.checkoutForm.controls['isFavorite'].setValue(this.isFavorite);
  }

  async onSubmit(): Promise<void> {
    
    if (this.checkoutForm.valid) {
     console.log("this.library",this.library);
     
      try {

        if (this.isUpdate) await this.dbService.updateImage(this.checkoutForm.value)
        else await this.dbService.saveImage(this.checkoutForm.value)
        this.checkoutForm.reset();
        this.MdDialogRef.close("dataaaaa");
      } catch (err) {
        console.log("errrrrr", err);

      }
    }
  }
}
