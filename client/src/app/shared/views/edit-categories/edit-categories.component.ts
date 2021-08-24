import './edit-categories.component.scss';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { AlertsService } from '../../../services/alerts/alerts.service';

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.scss']
})
export class EditCategoriesComponent implements OnInit {
  newCategory = new FormControl('', [Validators.required]);
  categories: string[];
  constructor(
    private MdDialogRef: MatDialogRef<EditCategoriesComponent>,
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder,
    private alertsService: AlertsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  async ngOnInit() {
   this.initCategories();
  }

  async initCategories(){
    this.categories = await this.categoriesService.getCategories();
  }
  async onSubmit() {
    if (this.newCategory.valid) {
      await this.categoriesService.addCategory(this.newCategory.value);
      this.initCategories();
      this.alertsService.alertWithSuccess(this.newCategory.value + " was added successfully")
    }
  }

  async deleteCategory(category: string) {
    await this.alertsService.delete(async () => {
      await this.categoriesService.delete(category);
      this.initCategories();
    }, category)
  }
}
