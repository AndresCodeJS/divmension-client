import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostsService } from '../../user/data-access/post.service';
import { IPostList } from '../../shared/interfaces/post.interface';
import { truncateText } from '../../utils/stringManager';
import { elapsedTime } from '../../utils/timeManager';

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

  postService = inject(PostsService)

  post: IPostList = {
    description: '',
    imageUrl: '',
    username: '',
    postId: '',
    timeStamp: 0,
    likesQuantity: 0,
    commentsQuantity: 0
  }

  description: string = ''
  postDate: string = ''

  showMoreDescriptionButton = false
  moreDescription = false

  showMoreDescription(){
    this.moreDescription = !this.moreDescription
  }

  // Cargar los datos al acceder al perfil del usuario -------------------------------------------------
  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe((params) => {
      const usernameParam = params.get('username') || '';
      const postIdParam = params.get('postId') || '';

      this.postService.getPostDetails(usernameParam,postIdParam).subscribe({
        next:(response)=>{
          console.log(response)
          this.post = response

          this.description = truncateText(response.description,100)
          this.postDate = elapsedTime(response.timeStamp)

          if(response.description.length >= 100){
            this.showMoreDescriptionButton = true
          }

          this.commentInput.nativeElement.blur();


        },
        error:(error)=>{
          console.log(error)
        }
      })

      console.log('hola', usernameParam, postIdParam);
    });
  }
}
