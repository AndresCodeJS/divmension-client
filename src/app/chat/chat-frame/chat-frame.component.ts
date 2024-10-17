import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { Store } from '../../store/store';
import { getToken } from '../../user/data-access/local-storage';
import { ChatCardComponent } from "../chat-card/chat-card.component";

@Component({
  selector: 'app-chat-frame',
  standalone: true,
  imports: [ChatCardComponent],
  templateUrl: './chat-frame.component.html',
  styles: ``,
})
export class ChatFrameComponent implements OnInit {
  store = inject(Store);

  //USADO PARA REFRESCAR LA CONEXION CADA 9 MINUTOS
  pingIntervalId: any = '';
  //USADO PARA RENOVAR LA CONEXION CADA 1 HORA Y 50 MINUTOS
  renewIntervalId: any = '';
  //USADO PARA DESCONECTAR A UN USUARIO AUSENTE
  disconnectTimeoutId: any = '';
  //USADO PARA VALIDAR SI EL USUARIO DEBE RECONECTARSE
  isOnline = false;

  webSocket: any;

  @Input() isOpen = false

  @Input() chat: string | undefined = ''

  constructor(private renderer: Renderer2, private el: ElementRef) {
     // Listener global para clicks fuera del componente
     this.renderer.listen('document', 'click', (event: Event) => {
      this.onDocumentClick(event);
    });
  }

  onDocumentClick(event: Event) {
    const clickedInside = this.el.nativeElement.contains(event.target);
    if (!clickedInside && this.isOpen) {
      //Detecta si se hizo click fuera del componente
      console.log('click fuera del componente')
      this.store.closeChat()
    }
  }

  ngOnInit(): void {
    if (getToken()) {
      this.connect();
    }

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

  async init() {
    this.webSocket = new WebSocket(
      //url apigateway websocket
      `wss://narritfovc.execute-api.us-east-1.amazonaws.com/prod/?token=${getToken()}`
    );
  }

  async connect() {
    //conectar socket
    this.init();

    //INICIA TEMPORIZADOR DE DESCONEXION PARA CUANDO EL USUARIO SE ENCUENTRA AUSENTE DURANTE UN TIEMPO
    this.setDisconnectTimeout();

    //INICIA EL INTERVALO PARA REFRESCAR CONEXION CADA 9 MIN
    this.pingIntervalId = setInterval(() => {
      let timestamp = Date.now();
      console.log('refrescando la conexion,', new Date(timestamp));
      this.webSocket?.send(
        JSON.stringify({
          action: 'SEND_MESSAGE',
          data: {
            message: 'Ping de Actualizacion',
          },
        })
      );
    }, 1000 * 60 * 9);

    //INICIA EL INTERVALO DE RENOVACION DE CONEXION CADA 1 HORA Y 50 MINUTOS
    this.renewIntervalId = setInterval(() => {
      let timestamp = Date.now();
      console.log('renovando conexion,', new Date(timestamp));

      //LUEGO DE 1H Y 50M SE RENUEVA LA CONEXION
      //SE CIERRA EL SOCKET ACTUAL ANTES DE SU VENCIMIENTO
      this.webSocket.close();
      //SE ABRE UNA NUEVA CONEXION
      this.init();
    }, 1000 * 60 * 110);

    this.isOnline = true;
  }

  async disconnect() {
    //limpiar intervalos
    clearInterval(this.pingIntervalId);
    clearInterval(this.renewIntervalId);
    this.webSocket.close();
    this.isOnline = false;
  }

  setDisconnectTimeout() {
    this.disconnectTimeoutId = setTimeout(() => {
      console.log('Se desconectó el user por inactividad');
      this.disconnect();
    }, 1000 * 60 * 30); // Se desconecta a los 30 min de inactividad
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    //CLICK DETECTADO PARA REINICIAR EL TEMPORIZADOR DE DESCONEXION

    //REINICIA EL TEMPORIZADOR CADA VEZ QUE EL USUARIO DA CLICK EN LA PAGINA
    if (getToken()) {
      if (this.isOnline) {
        //REINICIA EL TEMPORIZADOR DE DESCONEXION
        clearTimeout(this.disconnectTimeoutId);
        this.setDisconnectTimeout();
      } else {
        this.connect();
      }
    }
  }
}
