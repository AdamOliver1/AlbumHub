import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Library } from 'src/app/models/library';
import { ImageDetails } from '../../models/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(
    private httpClient: HttpClient
  ) { }

   shuffle(array:ImageDetails[]) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
    return array;
  }
  async updateImage(img: any) {
    await this.httpClient.post('http://localhost:3000/images/update', img).toPromise();
  }

  async saveImage(dataObject: any) {
    // unique file name for every image
    let fileName = new Date().toLocaleString().replace(/\D/g, '');
    let data = { ...dataObject, fileName };  
    await this.httpClient.post('http://localhost:3000/images/upload', data).toPromise();
  }

  async deleteImage(imageDetails: ImageDetails) {
    let body = {
      fileName: imageDetails.fileName,
      library: imageDetails.library
    }
    return await this.httpClient.post(`http://localhost:3000/images/delete`, body).toPromise();
  }

  async getFavoritesImages(libraries: Library[], isPrivate: boolean): Promise<ImageDetails[]> {
    return await this.getImages(libraries, true, isPrivate, false);
  }

  async getAllImages(libraries: Library[], isPrivate: boolean): Promise<ImageDetails[]> {
    return await this.getImages(libraries, false, isPrivate, false);
  }

  async getPrivateImages(libraries: Library[]): Promise<ImageDetails[]> {
    return await this.getImages(libraries, false, true, true);
  }

  // get all images from the libraries
  private async getImages(libraries: Library[], isFavorite: boolean, isPrivate: boolean, isJustPrivate: boolean): Promise<any> {
    let allImages: ImageDetails[] = [];  
    
    for (let i = 0; i < libraries.length; i++) {
      let images = await this.getFilteredImages(libraries[i].library, isFavorite, isPrivate, isJustPrivate);   
      if (isFavorite) allImages = allImages.concat(images.filter(img => img.isFavorite === true))
      else allImages = allImages.concat(images)
    }
    return allImages;
  }

  //get images by filters
  getFilteredImages(library: string, isFavorite: boolean, isPrivate: boolean, isJustPrivate: boolean = false): Promise<ImageDetails[]> {
    let imageDetails: ImageDetails[];
    return new Promise((res, rej) => {
      this.httpClient.get(`http://localhost:3000/images/?library=${library}`).subscribe((data) => {
        imageDetails = data as ImageDetails[];       
        if (isJustPrivate) res(imageDetails.filter(img => img.inPrivateMode === true))
        else if (isPrivate) {
          if (isFavorite) res(imageDetails.filter(img => img.isFavorite))
          else res(imageDetails)
        }
        else {
          if (isFavorite) res(imageDetails.filter(img => img.inPrivateMode === false && img.isFavorite))
          else res(imageDetails.filter(img => img.inPrivateMode === false))
        }
      })
    });
  }

  checkItemsInArray(smallArray: string[], bigArray: string[]): boolean {
    if (smallArray == null || smallArray.length == 0) return true;
    for (let index = 0; index < smallArray.length; index++) {
      let element = smallArray[index];
      if (!bigArray.includes(element)) return false;
    }
    return true;
  }

  filterImagesByTitleAndCategories(imageDetails: ImageDetails[], categories: string[], title: string): ImageDetails[] {
    return imageDetails.filter(img =>
      img.caption.includes(title) && this.checkItemsInArray(categories, img.categories))
  }

  toBase64(url: any, callback: any) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }
}
