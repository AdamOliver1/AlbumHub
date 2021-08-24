import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user_model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }

  async saveUser(user: User) {
    await this.httpClient.post('http://localhost:3000/users/signup', { user: user }).toPromise()
  }

  async checkPassword(password: any): Promise<any> {
    return await this.httpClient.post('http://localhost:3000/users/validate', { password }).toPromise();
  }

  async isUserExict(): Promise<any> {
    return await this.httpClient.get('http://localhost:3000/users/user-exist').toPromise();
  }
}
