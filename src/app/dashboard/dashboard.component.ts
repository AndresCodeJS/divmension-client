import {
  Component,
  effect,
  inject,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  untracked,
} from '@angular/core';
import { HeaderComponent } from '../shared/ui/navbar/header.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChatFrameComponent } from '../chat/chat-frame/chat-frame.component';
import { Store } from '../store/store';
import { IChat } from '../chat/chat.interface';
import { ChatService } from '../chat/data-access/chat.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, RouterModule, ChatFrameComponent],
  templateUrl: './dashboard.component.html',
  styles: ``,
})
export default class DashboardComponent {
  store = inject(Store);
  chatService = inject(ChatService);

  private destroyEffect: (() => void) | null = null;

  chatOpened = false;

  /* chat:string | undefined = '' */

  currentChat: IChat = {
    isOpen: false,
    to: '',
    photoUrl: '',
    newSortKey: '',
    oldSortKey: '',
    chatId: '',
  };

  constructor() {
    effect(() => {
      // This will run whenever any part of the store state changes
      console.log('Store state changed:', this.store.chat());

      let chat = this.store.chat();

      //USADO PARA ABRIR EL MODAL DE LA LISTA DE CHATS O UN CHAT ESPECIFICO
      this.chatOpened = chat.isOpen;

      /* this.chat = chat.to */

      if (chat.to) {
        console.log('se ejecuta busqueda del chat con, ', chat.to);

        this.currentChat.to = chat.to;
        this.currentChat.photoUrl = chat.photoUrl;
        this.currentChat.isOpen = true;

        this.chatService.getChat(chat.to).subscribe({
          next: (response) => {
            console.log('respuesta del chat', response);
            this.currentChat.oldSortKey = response.chat.oldSortKey;
            this.currentChat.chatId = response.chat.chatId;
            this.currentChat.messages = response.chat.messages.reverse();
          },
          error: (error) => {
            console.log('error: ', error);
          },
        });
      }

      /* console.log('Chat state:', this.store.chat()); */

      /*    // If you want to perform side effects without creating a dependency,
      // you can use untracked:
      untracked(() => {
        // This won't cause the effect to re-run when isLoading changes
        console.log('Is loading:', this.store.isLoading());
      }); */

      // Perform any other logic you need when the store changes
    });
  }

  closeChat() {
    this.currentChat = {
      isOpen: false,
      to: '',
      photoUrl: '',
      newSortKey: '',
      oldSortKey: '',
      chatId: '',
    };
  }
}
