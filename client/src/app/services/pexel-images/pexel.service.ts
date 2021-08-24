import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': '563492ad6f917000010000013f2355b0217b4b54ae088d21e99db9c2'
  })
}

@Injectable({
  providedIn: 'root'
})
export class PexelService {

  constructor(
    private httpClien: HttpClient
  ) { }

  getData(query:string,num:number):Observable<any>{
    const url = `https://api.pexels.com/v1/search?query=${query}&per_page=${num}`;
    return this.httpClien.get<any>(url,httpOptions);
  }
}
