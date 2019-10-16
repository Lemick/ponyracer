import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LiveRaceModel, RaceModel } from './models/race.model';
import { environment } from '../environments/environment';
import { WsService } from './ws.service';
import { Observable } from 'rxjs';
import { PonyWithPositionModel } from './models/pony.model';
import { map, takeWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  constructor(private httpClient: HttpClient, private wsService: WsService) {}

  list() {
    const url = `${environment.baseUrl}/api/races`;
    const params = { status: 'PENDING' };
    return this.httpClient.get<Array<RaceModel>>(url, { params });
  }

  bet(raceId: number, ponyId: number) {
    const url = `${environment.baseUrl}/api/races/${raceId}/bets`;
    return this.httpClient.post<RaceModel>(url, { ponyId });
  }

  get(id: number) {
    const url = `${environment.baseUrl}/api/races/${id}`;
    return this.httpClient.get<RaceModel>(url);
  }

  cancelBet(raceId: number) {
    const url = `${environment.baseUrl}/api/races/${raceId}/bets`;
    return this.httpClient.delete(url);
  }

  live(raceId: number): Observable<Array<PonyWithPositionModel>> {
    return this.wsService.connect<LiveRaceModel>(`/race/${raceId}`).pipe(
      takeWhile(value => value.status !== 'FINISHED'),
      map(value => value.ponies)
    );
  }

  boost(raceId: number, ponyId: number): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/races/${raceId}/boosts`, { ponyId });
  }
}
