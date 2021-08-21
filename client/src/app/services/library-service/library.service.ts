import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LibraryDataHolder } from 'src/app/models/libraryModels/libraryDataHolder';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  public static libraryChosen: string;
  constructor(private httpClient: HttpClient) {}
  
  addNewLibrary(name: string,desc:string) {
    return new Promise((res, rej) => {
      this.httpClient.post(`http://localhost:3000/add-library`,{library:name,desc:desc});
    })
  }

  getLibraries() {
    return new Promise((res, rej) => {
      this.httpClient.get(`http://localhost:3000/libraries`).subscribe((data) => {   
        console.log("librarieslibraries",data);
         
        res(data)         
      });
    })
  }
}

