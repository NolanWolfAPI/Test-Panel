import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {HubConnectionBuilder} from '@aspnet/signalr';
import {Log} from "../models/api/plugins/moderation/judgement-session";
import {OAuthService} from "angular-oauth2-oidc";

@Injectable()
export class WebSocketService {

  constructor(private authService: OAuthService) { }

  public getNewSocketConnection(url): Subject<MessageEvent> {
    let socket =  new WebSocket(url);
    let observable = new Observable(observer => {
      socket.onmessage = (event) => observer.next(JSON.parse(event.data));
      socket.onerror  = (event) => observer.error(event);
      socket.onopen = (event) => console.log('Web Socket Open');
      socket.onclose  = (event) => {
        console.log('Web Socket Closed');
        observer.complete();
      };
    });

    let observer = {
      next: (data: Object) => {
        if (socket.readyState === WebSocket.OPEN) socket.send(JSON.stringify(data));
        else {
          console.error('Cannot Send message')
        }

      },
    };
    return Subject.create(observer, observable);
  }

  public getNewSignalRConnection(url): Subject<MessageEvent> {
    let socket = new HubConnectionBuilder().withUrl(url, {
      accessTokenFactory:() => this.authService.getAccessToken(),
      //transport: HttpTransportType.WebSockets,
    }).build();
    socket.serverTimeoutInMilliseconds = 60000;
    let observable = new Observable(observer => {
      socket.onclose(error => error ? observer.error(event) : () => {
        socket.off('ReceiveMessage');
        console.log('Chat Session Closed');
        observer.complete();
      });
      socket.on('ReceiveMessage', (user, message, timeCode) =>
      {
        let model:Log = new Log();
        model.user_id = user;
        model.message = message;
        model.timestamp = timeCode;
        observer.next(model)
      });
      socket.start().then(() => {
        console.log('Chat Session Opened');
      }).catch(err => console.error('Error while establishing connection', err));
    });

    let observer = {
      next: (data: any) => {
        socket.send('SendMessage', data.uuid, data.text);
      },
    };
    return Subject.create(observer, observable);
  }
}
