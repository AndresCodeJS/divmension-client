import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostsService } from '../../user/data-access/post.service';
import {
  IComment,
  IPostList,
  LastEvaluatedKey,
} from '../../shared/interfaces/post.interface';

import { LikeHeartComponent } from '../../shared/ui/like-heart/like-heart.component';
import { Store } from '../../store/store';
import { LoadingSpinnerComponent } from '../../shared/ui/loading-spinner/loading-spinner.component';
import { elapsedTime } from '../../utils/timeManager';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-post-view',
  standalone: true,
  imports: [LikeHeartComponent, LoadingSpinnerComponent, RouterLink],
  templateUrl: './post-view.component.html',
  styles: ``,
})
export default class PostViewComponent {
  constructor(
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    // Listener global para clics fuera del componente
    this.renderer.listen('document', 'click', (event: Event) => {
      this.onDocumentClick(event);
    });
  }

  @Input() post: IPostList = {
    username: '',
    postId: '',
    imageUrl: '',
    description: '',
    timeStamp: 0,
    likesQuantity: 0,
    commentsQuantity: 0,
    isLiked: false,
  };

  fixedDate = elapsedTime;

  //FUNCION ACTIVADA AL HACER CLICK FUERA DEL COMPONENTE ------------------------------------

  @Output() closePostDetailsEmitter = new EventEmitter<boolean>();

  @Input() isPostCardOpen = false; // solo cuando la tarjeta esta abierta se puede cerrar

  onDocumentClick(event: Event) {
    //Devuelve false si el click se produce fuera de este componente
    const clickedInside = this.el.nativeElement?.contains(event.target);
    if (!clickedInside && this.isPostCardOpen) {
      this.closePostDetailsEmitter.emit(true);
      if (this.store.user().username) {
        this.commentInput.nativeElement.innerHTML = '';
      }
      this.content = '';
      this.errorLength = false;
      this.comments = [];
      this.lastCommentKey = {
        pk: '',
        sk: 'none',
      };
      this.isClicked = false;
    }
  }

  //CERRAR VENTANA DE DETALLES DEL POST
  closePostDetails() {
    this.closePostDetailsEmitter.emit(true);
    this.commentInput.nativeElement.innerHTML = '';
  }

  //COMENTARIOS ----------------------------------------------------------

  //Logica usada para el div usado como input text al escribir un comentario en el post -----
  @ViewChild('commentInput') commentInput!: ElementRef;
  content: string = '';

  ngAfterViewInit() {
    this.focusInput();
  }

  onInput() {
    this.content = this.commentInput.nativeElement.innerHTML;
  }

  onKeyDown(event: KeyboardEvent) {
    this.errorLength = false;
    if (event.key == 'Enter') {
      event.preventDefault();
      this.postComment();
      /* console.log(this.content); */
      this.commentInput.nativeElement.innerHTML = '';
    }
  }

  errorLength = false;
  loadingPostComment = false;

  store = inject(Store);

  //PUBLICAR EL COMENTARIO
  postComment() {
    if (this.content.length > 100) {
      this.errorLength = true;
      return;
    }

    this.loadingPostComment = true;

    this.postService.postComment(this.post.postId, this.content).subscribe({
      next: (response) => {
        console.log(response);
        this.post.commentsQuantity++;

        let store = this.store.user();

        console.log('respuesta luego del comentario',response)

        this.comments.unshift({
          commentId: response.commentId,
          user: store.username,
          imageUrl: store.photoUrl,
          content: this.content,
          timeStamp: response.currentTimestamp,
        });

        this.content = '';
        this.commentInput.nativeElement.innerHTML = '';
        this.commentInput.nativeElement.blur();
        this.loadingPostComment = false;
      },
      error: (error) => {
        console.log(error);
        this.loadingPostComment = false;
      },
    });
  }

  focusInput() {
    if (this.store.user().username) {
      this.commentInput.nativeElement.focus();
    }
  }

  // MOSTRAR LOS COMENTARIOS -----------------------------------------------------

  @Input() showCommentsButton = false;

  loadingComments = false;

  lastCommentKey: LastEvaluatedKey = {
    pk: '',
    sk: 'none',
  };

  comments: IComment[] = [];

  isClicked = false;

  onCommentIcon() {
    //Usada para cargar los comentarios iniciales al hacer click en el icono
    if (!this.isClicked) {
      this.showComments();
      this.isClicked = true;
    }
  }

  showComments() {
    this.loadingComments = true;
    this.postService
      .getComments(this.post.postId, this.lastCommentKey)
      .subscribe({
        next: (response) => {
          if (response.lastEvaluatedKey) {
            this.lastCommentKey = response.lastEvaluatedKey;
          } else {
            this.lastCommentKey = {
              pk: '',
              sk: 'none',
            };
          }
          if (response.comments.length) {
            this.comments = this.comments.concat(response.comments);
          }

          this.showCommentsButton = false;
          this.loadingComments = false;
        },
        error: (error) => {
          console.log(error);
          this.loadingComments = false;
        },
      });
  }

  // ----------------------------------------------------------------------------------

  private subscription: Subscription | undefined;

  postService = inject(PostsService);

  moreDescription = false;

  showMoreDescription() {
    this.moreDescription = !this.moreDescription;
  }

  // DAR LIKE A POST --------------------------------------------------------

  like() {
    this.postService.likePost(this.post.postId).subscribe({
      next: (response) => {
        this.post.isLiked = true;

        this.post.likesQuantity++;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  unLike() {
    this.postService.unLikePost(this.post.postId).subscribe({
      next: (response) => {
        this.post.isLiked = false;
        this.post.likesQuantity--;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
