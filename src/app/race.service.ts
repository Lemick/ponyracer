import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RaceModel } from './models/race.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  constructor(private httpClient: HttpClient) {}

  list() {
    const url = `${environment.baseUrl}/api/races`;
    const params = { status: 'PENDING' };
    return this.httpClient.get<Array<RaceModel>>(url, { params });
  }

  bet(raceId: number, ponyId: number) {
    const url = `${environment.baseUrl}/api/races/${raceId}/bets`;
    console.log('bet on pony', url);
    return this.httpClient.post<RaceModel>(url, { ponyId });
  }

  get(id: number) {
    const url = `${environment.baseUrl}/api/races/${id}`;
    console.log('call url', url);
    return this.httpClient.get<RaceModel>(url);
  }
}
