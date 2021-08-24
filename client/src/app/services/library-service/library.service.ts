import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  public static libraryChosen: string;
  constructor(private httpClient: HttpClient) { }

  async addNewLibrary(name: string, desc: string) {
    return await this.httpClient.post(`http://localhost:3000/library/add-library`, { library: name, desc }).toPromise();
  }

  async getLibraries() {
    return await this.httpClient.get(`http://localhost:3000/library/libraries`).toPromise();
  }
}

