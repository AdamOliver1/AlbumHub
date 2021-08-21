import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  categories:string[];
  constructor() { 
    this.categories = ["family","business","holiday","work","school"]
  }

  getCategories(){
    return this.categories;
  }
}
