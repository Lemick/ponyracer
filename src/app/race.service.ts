import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RaceModel} from './models/race.model';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  constructor(private httpClient: HttpClient) {
  }

  list() {
    const url = 'http://ponyracer.ninja-squad.com/api/races';
    const params = {status: 'PENDING'};
    return this.httpClient.get<Array<RaceModel>>(url, { params });
  }
}
