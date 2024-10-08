import { Component, HostListener, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/ui/navbar/header.component';
import FloatingButtonComponent from './shared/ui/floating-button/floating-button.component';
import { Store } from './store/store';
import { io, Socket } from 'socket.io-client';
import { getToken } from './user/data-access/local-storage';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FloatingButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  store = inject(Store);

  private socket: Socket;

  constructor() {
    this.socket = io(`wss://narritfovc.execute-api.us-east-1.amazonaws.com/prod/?token=${getToken()}`); // ENV WEBSOCKET URL
  }

  //USADO PARA REFRESCAR LA CONEXION CADA 9 MINUTOS
  pingIntervalId: any = '';
  //USADO PARA RENOVAR LA CONEXION CADA 1 HORA Y 50 MINUTOS
  renewIntervalId: any = '';
  //USADO PARA DESCONECTAR A UN USUARIO AUSENTE
  disconnectTimeoutId: any = '';
  //USADO PARA VALIDAR SI EL USUARIO DEBE RECONECTARSE
  isOnline = false;

  ngOnInit(): void {
    this.connect()


    //FUNCIONES EJECUTADAS CUANDO SE INTERACTUA CON EL SOCKET
    this.socket.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    this.socket.on('message', (data: any) => {
      console.log('Received message:', data);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket');
    });
  }

  async connect() {
    //conectar socket
    /* this.socket.connect(); */

    //INICIA TEMPORIZADOR DE DESCONEXION CUANDO EL USUARIO SE ENCUENTRA AUSENTE
    this.disconnectTimeoutId = setTimeout(() => {
      console.log('intervalo de desconexion');
      /* }, 1000*60*30) // Se desconecta a los 30 min de inactividad */
    }, 3000); // Se desconecta a los 30 min de inactividad

    this.isOnline = true;
  }

  async disconnect() {
    //limpiar intervalos
    this.isOnline = false;
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    //CLICK DETECTADO PARA REINICIAR EL TEMPORIZADOR DE DESCONEXION 
    console.log('Click detectado en la página:', this.store.user().username);

    if (this.isOnline) {
      //REINICIA EL TEMPORIZADOR DE DESCONEXION
      clearTimeout(this.disconnectTimeoutId);
      this.disconnectTimeoutId = setTimeout(() => {
        console.log('intervalo de desconexion');
        /* }, 1000*60*30) // Se desconecta a los 30 min de inactividad */
      }, 3000); // Se desconecta a los 30 min de inactividad
    }

    /* this.store.resetRefreshInterval() */
  }
}
