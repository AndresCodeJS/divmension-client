import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IChat } from '../chat.interface';

@Component({
  selector: 'app-chat-header',
  standalone: true,
  imports: [],
  templateUrl: './chat-header.component.html',
  styles: ``
})
export class ChatHeaderComponent {

  @Input() chat:IChat = {
    isOpen: false,
    to: '',
    photoUrl: '',
    newSortKey: '',
    oldSortKey: '',
    chatId: '',
  }

  @Output() backEventEmitter = new EventEmitter<boolean>();

  back(){
    this.backEventEmitter.emit(true)
  }
}
