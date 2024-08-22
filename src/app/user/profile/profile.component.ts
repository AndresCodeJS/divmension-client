import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styles: ``
})
export default class ProfileComponent implements OnInit {

  private subscription: Subscription | undefined;

  username: string | null

  /* private route = inject(ActivatedRoute) */

  constructor(private route: ActivatedRoute){
    this.username = this.route.snapshot.paramMap.get('username') || ''
  }

  isLoading = false

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(params => {
      const usernameParam = params.get('username');
      // Realiza las acciones necesarias con el nuevo id
     /*  console.log('Nuevo ID:', username); */
      this.username = usernameParam
    });

  }



}
