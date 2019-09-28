import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  register(login: string, password: string, birthYear: number) {
    const url = 'http://ponyracer.ninja-squad.com/api/users';
    return this.httpClient.post<UserModel>(url, { login, password, birthYear });
  }

  authenticate(credentials: {login: string, password: string}) {
    const url = 'http://ponyracer.ninja-squad.com/api/users/authentication';

    return this.httpClient.post<UserModel>(url, { login: credentials.login, password: credentials.password });
  }
}
