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
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostsService } from '../../user/data-access/post.service';
import { IPostList } from '../../shared/interfaces/post.interface';
import { elapsedTime } from '../../utils/timeManager';
import { LikeHeartComponent } from "../../shared/ui/like-heart/like-heart.component";
import { Store } from '../../store/store';

@Component({
  selector: 'app-post-view',
  standalone: true,
  imports: [LikeHeartComponent],
  templateUrl: './post-view.component.html',
  styles: ``,
})
export default class PostViewComponent {
  constructor(
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private el: ElementRef,
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
    isLiked: false
  };

  fixedDate = elapsedTime

  //FUNCION ACTIVADA AL HACER CLICK FUERA DEL COMPONENTE ------------------------------------

  @Output() closePostDetailsEmitter = new EventEmitter<boolean>();

  @Input() isPostCardOpen= false; // solo cuando la tarjeta esta abierta se puede cerrar

  onDocumentClick(event: Event) {
    //Devuelve false si el click se produce fuera de este componente
    const clickedInside = this.el.nativeElement.contains(event.target);
    if (!clickedInside && this.isPostCardOpen) {
      console.log('click fuera del card')
      this.closePostDetailsEmitter.emit(true);
      this.commentInput.nativeElement.innerHTML = '';
    }
  }

  //CERRAR VENTANA DE DETALLES DEL POST
  closePostDetails(){
    this.closePostDetailsEmitter.emit(true);
    this.commentInput.nativeElement.innerHTML = '';
  }

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

  postService = inject(PostsService);

  moreDescription = false;

  showMoreDescription() {
    this.moreDescription = !this.moreDescription;
  }

  // DAR LIKE A POST --------------------------------------------------------

  store = inject(Store)

  like(){
    this.postService.likePost(this.post.postId).subscribe({
      next: (response) =>{
        this.post.isLiked = true
        
        this.post.likesQuantity ++;
      },
      error: (error)=>{
        console.log(error)
      }
    })
  }

  unLike(){
    this.postService.unLikePost(this.post.postId).subscribe({
      next: (response) =>{
        this.post.isLiked = false
        this.post.likesQuantity --;
      },
      error: (error)=>{
        console.log(error)
      }
    })
  }

}
