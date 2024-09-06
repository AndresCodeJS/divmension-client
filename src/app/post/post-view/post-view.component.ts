import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-view',
  standalone: true,
  imports: [],
  templateUrl: './post-view.component.html',
  styles: ``,
})
export default class PostViewComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  //Logica usada para el div usado como input text al escribir un comentario en el post -----
  @ViewChild('commentInput') commentInput!: ElementRef;
  content: string = '';
  comments: string[] = [];

  ngAfterViewInit() {
    this.focusInput();
  }

  onInput() {
    this.content = this.commentInput.nativeElement.innerHTML;
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      event.preventDefault();
      this.postComment();
      /* console.log(this.content); */
      this.commentInput.nativeElement.innerHTML = '';
    }
  }

  postComment() {
    console.log(this.content);
    this.commentInput.nativeElement.innerHTML = '';
    this.commentInput.nativeElement.blur();
  }

  focusInput() {
    this.commentInput.nativeElement.focus();
  }

  // ----------------------------------------------------------------------------------

  private subscription: Subscription | undefined;

  // Cargar los datos al acceder al perfil del usuario -------------------------------------------------
  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe((params) => {
      const usernameParam = params.get('username') || '';
      const postIdParam = params.get('postId') || '';

      console.log('hola', usernameParam, postIdParam);
    });
  }
}
