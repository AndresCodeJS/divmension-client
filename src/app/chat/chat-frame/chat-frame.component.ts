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
import { ChatCardComponent } from '../chat-card/chat-card.component';
import { ChatHeaderComponent } from '../chat-header/chat-header.component';
import { IChat } from '../chat.interface';
import { ulid } from 'ulid';

@Component({
  selector: 'app-chat-frame',
  standalone: true,
  imports: [ChatCardComponent, ChatHeaderComponent],
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

  isLoading = false;

  webSocket: any;

  @Input() isOpen = false;

  @Input() chat: IChat = {
    isOpen: false,
    to: '',
    photoUrl: '',
    newSortKey: '',
    oldSortKey: '',
    chatId: '',
    messages: [],
  };

  constructor(private renderer: Renderer2, private el: ElementRef) {
    // Listener global para clicks fuera del componente
    this.renderer.listen('document', 'click', (event: Event) => {
      this.onDocumentClick(event);
    });
  }

  sendMessage(messageField: HTMLTextAreaElement) {
    console.log(messageField.value);

    //SI EL CHAT ES NUEVO SE GENERA UN ID
    let chatId = this.chat.chatId || ulid()

    let data = {
      newSortKey: ulid(),
      oldSortKey: this.chat.oldSortKey,
      token: getToken(),
      to: this.chat.to,
      id: chatId,
      message: messageField.value,
      photoUrl: this.store.user().photoUrl,
    };

    const body = {
      action: 'SEND_MESSAGE',
      data,
    };

    console.log('se enviará: ', body)

    this.webSocket.send(JSON.stringify(body));

    messageField.value = '';

    if(!this.chat.oldSortKey){ // CUANDO ES PRIMERA VEZ QUE SE ENVIA UN MSJ
      this.chat.oldSortKey = data.newSortKey
    }
  }

  ReceiveMessage(){
    this.webSocket.onmessage = (event: any) =>{
      console.log('recibiendo mensaje: ', JSON.parse(event.data))

      let response = JSON.parse(event.data)

      let sender = response.sender

      console.log('hablando con ', this.chat.to)
      console.log('recibiendo de', sender )

      if(this.chat.isOpen && this.chat.to == sender ){//CUANDO ES PRIMERA VEZ QUE SE RECIBE UN MENSAJE
        this.chat.oldSortKey = response.info.newSortKey
        this.chat.chatId = response.info.id

        //TODO

        //RELLENAR LAS DEMAS PROPIEDADES
      }
    }
  }

  enterMessage(messageField: HTMLTextAreaElement, event: KeyboardEvent) {
    if (event.key == 'Enter') {
      event.preventDefault();
      this.sendMessage(messageField);
    }
  }

  @Output() closeChatEventEmitter = new EventEmitter<string>();

  onDocumentClick(event: Event) {
    const clickedInside = this.el.nativeElement.contains(event.target);
    if (!clickedInside && this.isOpen) {
      //Detecta si se hizo click fuera del componente
      console.log('click fuera del componente');
      this.store.closeChat();

      //USADO PARA BORRAR LOS DATOS DEL CHAT ACTUAL EN DASHBOARD
      this.closeChatEventEmitter.emit('');
    }
  }

  //MUESTRA LA LISTA DE CHATS AL PRESIONAR EL BOTON DE BACK EN UN CHT EN APRTICULAR
  back() {
    console.log('se ejecuta el back');
    this.closeChatEventEmitter.emit();
  }

  //SE EJECUTA CONSULTA CUANDO SE LLEGA AL PENULTIMO CHAT DE LA LISTA
  onScroll(event: any) {
    const element = event.target as HTMLElement;

    //Verdadero cuando se hace scroll hasta la penultima fila de la lista de posts
    const atBottom =
      element.scrollHeight - element.scrollTop < element.clientHeight + 500;

    console.log('scrollHeitght', element.scrollHeight);

    console.log('scrollTop', element.scrollTop);

    console.log('clientHeitght', element.clientHeight);

    console.log(atBottom);
  }

  ngOnInit(): void {
    //INICIA LA CONEXION DEL WEBSOCKET
    if (getToken()) {
      this.connect();
    }

    //OBTIENE LOS PRIMEROS 10 CHATS PERTENECIENTES AL USUARIO LOGUEADO


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
          action: 'PING',
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

    //FUNCION EJECUTADA CUANDO SE RECIBE UN MENSAJE
    this.ReceiveMessage()

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
