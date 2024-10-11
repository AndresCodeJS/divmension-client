import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { getToken } from '../../user/data-access/local-storage';

@Injectable({
  providedIn: 'root',
})
export class webSocketService {
  private webSocket: any;
  constructor() {
   /*  this.webSocket = new Socket({
      url: `wss://wctaz4ns99.execute-api.us-east-1.amazonaws.com/prod/`, // ENV WEBSOCKET URL
      options: {},
    }); */
    this.webSocket = new WebSocket('wss://wctaz4ns99.execute-api.us-east-1.amazonaws.com/prod/', "json");
  }

  // this method is used to start connection/handhshake of socket with server
  connectSocket(message: string) {
    this.webSocket.emit('connect', message);
  }

  // this method is used to get response from server
  receiveStatus() {
    return this.webSocket.fromEvent('/get-response');
  }

  // this method is used to end web socket connection
  disconnectSocket() {
    this.webSocket.disconnect();
  }
}
