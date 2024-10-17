import { Component, effect, inject, OnChanges, OnDestroy, OnInit, SimpleChanges, untracked } from '@angular/core';
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
export default class DashboardComponent{

  store = inject(Store)
  private destroyEffect: (() => void) | null = null;

 chatOpened = false

  constructor(){
    effect(() => {
      // This will run whenever any part of the store state changes
      console.log('Store state changed:', this.store.chat());
      
      this.chatOpened = this.store.chat().isOpen
      
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

}
