import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styles: ``
})
export default class ProfileComponent {

  id: string

  /* private route = inject(ActivatedRoute) */

  constructor(private route: ActivatedRoute){
    this.id = this.route.snapshot.paramMap.get('username') || ''
  }




}
