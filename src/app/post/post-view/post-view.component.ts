import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-view',
  standalone: true,
  imports: [],
  templateUrl: './post-view.component.html',
  styles: ``
})
export default class PostViewComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) {}

  private subscription: Subscription | undefined;

    // Cargar los datos al acceder al perfil del usuario -------------------------------------------------
    ngOnInit(): void {
      this.subscription = this.route.paramMap.subscribe((params) => {
        const usernameParam = params.get('username') || '';
        const posttIdParam = params.get('postId') || '';

        console.log('hola', usernameParam, posttIdParam)

      })
    }

}
