import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { imag, logSigmoid } from '@tensorflow/tfjs-core';
import { Library } from 'src/app/models/libraryModels/library';
import { ImageDetails } from '../../models/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private httpClient: HttpClient
  ) { }


  async getFavoritesImages(libraries: Library[], isPrivate: boolean): Promise<ImageDetails[]> {
    return await this.getImages(libraries,true, isPrivate,false);
  }

  async getAllImages(libraries: Library[], isPrivate: boolean): Promise<ImageDetails[]> {
    return await this.getImages(libraries,false, isPrivate, false);
  }
  async getPrivateImages(libraries: Library[]): Promise<ImageDetails[]> {
    return await this.getImages(libraries, false, true, true);
  }

  private async getImages(libraries: Library[], isFavorite: boolean, isPrivate: boolean, isJustPrivate: boolean): Promise<ImageDetails[]> {
    let imagess: ImageDetails[] = [];
    for (let library of libraries) {
      let images = await this.getImagesByLibrary(library.library, isFavorite, isPrivate,isJustPrivate);
      if (isFavorite) imagess = imagess.concat(images.filter(img => img.isFavorite === true))
      else imagess = imagess.concat(images)
    }
    return imagess
  }

  getImagesByLibrary(library: string, isFavorite: boolean, isPrivate: boolean, isJustPrivate: boolean = false): Promise<ImageDetails[]> {
    let imageDetails: ImageDetails[];
    return new Promise((res, rej) => {
      this.httpClient.get(`http://localhost:3000/images/?library=${library}`).subscribe((data) => {
        imageDetails = data as ImageDetails[];
        console.log(imageDetails);
        if (isJustPrivate) res(imageDetails.filter(img => img.inPrivateMode === true))
        else if (isPrivate) {
          if (isFavorite) res(imageDetails.filter(img => img.isFavorite))
          else res(imageDetails)
        }
        else {
          if (isFavorite) res(imageDetails.filter(img => img.inPrivateMode == false && img.isFavorite))
          else res(imageDetails.filter(img => img.inPrivateMode == false))
        }
      })
    });
  }

  checkItemsInArray(smallArray: string[], bigArray: string[]): boolean {
    if (smallArray == null || smallArray.length == 0) return true;
    for (let index = 0; index < smallArray.length; index++) {
      const element = smallArray[index];
      if (!bigArray.includes(element)) return false;
    }
    return true;
  }

  filterImagesByTitleAndCategories(imageDetails: ImageDetails[], categories: string[], title: string): ImageDetails[] {
    return imageDetails.filter(img =>
      img.caption.includes(title) && this.checkItemsInArray(categories, img.categories))
  }


  

  
}
