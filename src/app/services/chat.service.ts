import {Injectable} from '@angular/core';
import {WebSocketService} from './socket.service';
import {Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {UUID} from "angular2-uuid";

@Injectable()
export class ChatService {

  constructor(private wsService: WebSocketService) { }

  getJudgementChatSession(judgementSessionId:UUID): Subject<any> {
    const path = `${environment.baseAPIURL}plugins/moderation/judgementsessions/chatsession?sessionId=${judgementSessionId}`;
    return this.getConnection(path);
  }

  // getEchoServer() {
  //   const path = `wss://echo.websocket.org`;
  //   return this.getConnection(path);
  // }

  private getConnection(path) {
    return <Subject<any>>this.wsService.getNewSignalRConnection(path);//.map((response: any): any => response );
  }
}
