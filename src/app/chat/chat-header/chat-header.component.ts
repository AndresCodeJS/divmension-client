import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-header',
  standalone: true,
  imports: [],
  templateUrl: './chat-header.component.html',
  styles: ``
})
export class ChatHeaderComponent {

  @Input() item:any = {
    user: 'Andres',
    imageUrl:'',
    status: 'Online'
  }

}
