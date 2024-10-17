import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-card',
  standalone: true,
  imports: [],
  templateUrl: './chat-card.component.html',
  styles: ``
})
export class ChatCardComponent {

  @Input() item:any = {
    user: 'Andres',
    imageUrl:'',
    content: 'Este es un comentario'
  }

}
