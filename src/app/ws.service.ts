import { Inject, Injectable, Type } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { environment } from '../environments/environment';
import { WEBSOCKET, WEBSTOMP } from './app.tokens';
import { Client, Subscription } from 'webstomp-client';

@Injectable({
  providedIn: 'root'
})
export class WsService {
  constructor(@Inject(WEBSOCKET) private WebSocket: Type<WebSocket>, @Inject(WEBSTOMP) private Webstomp: any) {}

  connect<T>(channel: string): Observable<T> {
    return new Observable<T>((observer: Observer<T>) => {
      const connection: WebSocket = new this.WebSocket(`${environment.wsBaseUrl}/ws`);
      const stompClient: Client = (this.Webstomp.Client = this.Webstomp.over(connection));

      let subscription: Subscription;
      stompClient.connect(
        { login: null, passcode: null },
        () => {
          subscription = stompClient.subscribe(channel, message => {
            const bodyAsJson = JSON.parse(message.body);
            observer.next(bodyAsJson);
          });
        },
        error => {
          // propagate the error
          observer.error(error);
        }
      );

      return () => {
        if (subscription) {
          subscription.unsubscribe();
        }
        connection.close();
      };
    });
  }
}
