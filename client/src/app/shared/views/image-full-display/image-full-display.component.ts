import { Component, Input, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ImageDetails } from '../../../models/image';

@Component({
  selector: 'app-image-full-display',
  templateUrl: './image-full-display.component.html',
  styleUrls: ['./image-full-display.component.scss']
})

export class ImageFullDisplayComponent implements OnInit {
  @Input()
  imageDetails: ImageDetails;  
  allCategories: string[] = [];
  constructor(
    private categoriesService: CategoriesService,
  ) { }

 async ngOnInit() {
    this.allCategories = await this.categoriesService.getCategories();
  }
  
}
