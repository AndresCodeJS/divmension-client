import { Component, HostListener, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/ui/navbar/header.component';
import FloatingButtonComponent from './shared/ui/floating-button/floating-button.component';
import { Store } from './store/store';
import { webSocketService } from './shared/data-access/websocket-service';
import { getToken } from './user/data-access/local-storage';
/* import { io, Socket } from 'socket.io-client'; */
/* import { getToken } from './user/data-access/local-storage'; */

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FloatingButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  store = inject(Store);

 /*  webSocket: any; */

  /* private socket: Socket; */

  /* constructor(private websocketService: webSocketService) { */
    /* this.socket = io(`wss://narritfovc.execute-api.us-east-1.amazonaws.com/prod/?token=${getToken()}`); // ENV WEBSOCKET URL */
  /* } */

  //USADO PARA REFRESCAR LA CONEXION CADA 9 MINUTOS
  pingIntervalId: any = '';
  //USADO PARA RENOVAR LA CONEXION CADA 1 HORA Y 50 MINUTOS
  renewIntervalId: any = '';
  //USADO PARA DESCONECTAR A UN USUARIO AUSENTE
  disconnectTimeoutId: any = '';
  //USADO PARA VALIDAR SI EL USUARIO DEBE RECONECTARSE
  isOnline = false;

  webSocket:any

  /* connection = new WebSocket('wss://wctaz4ns99.execute-api.us-east-1.amazonaws.com/prod'); */

  ngOnInit(): void {
    this.connect()

    this.webSocket.addEventListener('open', this.onSocketOpen())

    this.webSocket.addEventListener('close', this.onSocketClose())

    this.webSocket.addEventListener('message', (event:any)=>{
      this.onSocketMessage(event)
    })
    //FUNCIONES EJECUTADAS CUANDO SE INTERACTUA CON EL SOCKET
   /*  this.socket.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    this.socket.on('message', (data: any) => {
      console.log('Received message:', data);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket');
    }); */
  }

  onSocketOpen(){
    console.log('WebSocket connected')
  }

  onSocketMessage(event:any){

  }

  onSocketClose(){

  }


  async connect() {
    //conectar socket
    this.webSocket = new WebSocket(`wss://narritfovc.execute-api.us-east-1.amazonaws.com/prod/?token=${getToken()}`);


    //INICIA TEMPORIZADOR DE DESCONEXION CUANDO EL USUARIO SE ENCUENTRA AUSENTE
    this.disconnectTimeoutId = setTimeout(() => {
      console.log('intervalo de desconexion');
      /* }, 1000*60*30) // Se desconecta a los 30 min de inactividad */
      
    }, 3000); // Se desconecta a los 30 min de inactividad

    //INICIA EL INTERVALO PARA REFRESCAR CONEXION CADA 9 MIN
    /* this.pingIntervalId = setInterval(() => {
      console.log('refrescando la conexion,')
    },1000*60*9) */
    this.pingIntervalId = setInterval(() => {
      let timestamp = Date.now()
      console.log('refrescando la conexion,', new Date(timestamp))
      this.webSocket?.send(JSON.stringify({
        action:"SEND_MESSAGE",
        data:{
          message:"Ping de Actualizacion"
        }
      }))
    },1000*60*9)

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
