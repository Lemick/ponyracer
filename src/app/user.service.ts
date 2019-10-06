import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserModel} from './models/user.model';
import {BehaviorSubject} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly KEY_USER_LOCAL_STORAGE = 'rememberMe';

  userEvents: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(undefined);

  constructor(private httpClient: HttpClient) {
    this.retrieveUser();
  }

  register(login: string, password: string, birthYear: number) {
    const url = 'http://ponyracer.ninja-squad.com/api/users';
    return this.httpClient.post<UserModel>(url, { login, password, birthYear });
  }

  authenticate(credentials: {login: string, password: string}) {
    const url = 'http://ponyracer.ninja-squad.com/api/users/authentication';

    return this.httpClient.post<UserModel>(url, { login: credentials.login, password: credentials.password })
      .pipe(
          tap(user => this.storeLoggedInUser(user))
       );
  }

  storeLoggedInUser(user: any) {
    window.localStorage.setItem(this.KEY_USER_LOCAL_STORAGE, JSON.stringify(user));
    this.userEvents.next(user);
  }

  retrieveUser() {
    const userStored = window.localStorage.getItem(this.KEY_USER_LOCAL_STORAGE);
    if (userStored) {
      this.userEvents.next(JSON.parse(userStored));
    }
  }
}
