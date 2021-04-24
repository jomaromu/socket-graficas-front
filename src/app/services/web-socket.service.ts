import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { io, Socket } from 'socket.io-client/build/index';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  public socketStatus = false;

  constructor(
    private socket: Socket
  ) {
    // this.socket = io('http://localhost:5000');
    this.checkStatus();
  }

  // verifica estado de la conexion
  checkStatus(): void {

    console.log('inicia checstatus');

    // escuchar el servidor
    this.socket.on('connect', () => {
      console.log('conectado al servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });
  }

  // emitir eventos
  // tslint:disable-next-line: ban-types
  emitir(evento: string, payload?: any, callback?: Function): void {
    this.socket.emit(evento, payload, callback);
  }

  // escuchar eventos
  listen(evento: string): Observable<any> {

    // return new Observable((subscriber) => {
    //   this.socket.on(evento, (callback: any) => {
    //     subscriber.next(callback);
    //   });
    // });

    return this.socket.fromEvent( evento );
  }
}
