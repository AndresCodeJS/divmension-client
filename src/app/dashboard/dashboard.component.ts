import { Component, inject, OnChanges, SimpleChanges } from '@angular/core';
import { HeaderComponent } from "../shared/ui/navbar/header.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChatFrameComponent } from "../chat/chat-frame/chat-frame.component";
import { Store } from '../store/store';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, RouterModule, ChatFrameComponent],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export default class DashboardComponent  implements OnChanges {

  store = inject(Store)

  ngOnChanges(changes: SimpleChanges) {
    if (changes['store']) {
      console.log('el store ha cambiado')
    }
  }

 
}
