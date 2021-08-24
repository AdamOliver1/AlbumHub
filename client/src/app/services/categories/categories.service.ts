import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  categories: string[];
  constructor(
    private httpClient: HttpClient
  ) {
    this.categories = ["family", "business", "holiday", "work", "school"]
  }

  async getCategories(): Promise<any> {
    return await this.httpClient.get('http://localhost:3000/categories').toPromise();
  }

  async addCategory(category: string): Promise<any> {
    return await this.httpClient.post('http://localhost:3000/categories/add', { category }).toPromise();
  }
   
  async delete(category: string): Promise<any> {
    return await this.httpClient.post('http://localhost:3000/categories/delete', { category }).toPromise();
  }

}
