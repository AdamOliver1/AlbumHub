import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user_model';
@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private httpClient: HttpClient) { }

  async saveUser(user: User) {
    console.log("serviceeee", user);
    await this.httpClient.post('http://localhost:3000/users/signup', { user: user }).subscribe((data) => {
      console.log(data);

    })
  }
  async updateImage(img: any) {
    console.log("dataObject", img);
    await this.httpClient.post('http://localhost:3000/images/update', img).subscribe();//.toPromise();
  }

  async checkPassword(password: any): Promise<boolean> {
    console.log("password", password);
    return new Promise(async (res, rej) => {
      await this.httpClient.post('http://localhost:3000/users/validate',{password}).subscribe(data => {
        res(data as boolean);
      });
    });

  }

  async isUserExict(): Promise<boolean> {
    return new Promise((res, rej) => {
      this.httpClient.get('http://localhost:3000/users/user-exist').subscribe((data) => {
        console.log(data, "dataaaaaa");
        res(data as boolean);
      })
    });

  }

  async saveImage(dataObject: any) {

    let date = new Date().toLocaleString().replace(/\D/g, '');
    let data = {
      image: dataObject.imgSrc,
      fileName: date,
      categories: dataObject.categories,
      isFavorite: dataObject.isFavorite,
      inPrivateMode: dataObject.inPrivateMode,
      library: dataObject.library,
      caption: dataObject.caption
    };
    console.log("dataObject", dataObject);
    await this.httpClient.post('http://localhost:3000/images/upload', data).subscribe((data) => {

    })
  }


}
