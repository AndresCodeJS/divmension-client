import { Component, inject, OnInit } from '@angular/core';
import { PostsService } from '../../user/data-access/post.service';
import {
  IPostList,
  LastEvaluatedKey,
} from '../../shared/interfaces/post.interface';
import { PostCardComponent } from '../../post/post-card/post-card.component';

@Component({
  selector: 'app-home-view',
  standalone: true,
  imports: [PostCardComponent],
  templateUrl: './home-view.component.html',
  styles: ``,
})
export default class HomeViewComponent implements OnInit {
  postService = inject(PostsService);

  loadingScreen = false;

  loadingPosts = false;

  lastEvaluatedKey: LastEvaluatedKey = {
    pk: 'none',
    sk: 'none',
  };

  openPostCard(post: IPostList) {}

  posts: IPostList[] = [];

  ngOnInit(): void {
    this.loadingScreen = true;

    //CARGA INICIAL POSTS
    this.postService.getAllPosts().subscribe({
      next: (response) => {
        console.log(response);

        if (response.posts.length) {
          this.posts = response.posts;
        }
       
        if (response.lastEvaluatedKey) {
          console.log('Entra en asignacion')
          this.lastEvaluatedKey = response.lastEvaluatedKey;
        }

        this.loadingScreen = false;
      },
      error: (error) => {
        console.log(error);
        this.loadingScreen = false;
      },
    });
  }

  //CARGAR MAS POSTS CUANDO SE LLEGA A LA PEMULTIMA FILA DE LSO POSTS
  queryExecuted = false;

  onScroll(event: any) {

    const element = event.target as HTMLElement;

    //Verdadero cuando se hace scroll hasta la penultima fila de la lista de posts
    const atBottom =
      element.scrollHeight - element.scrollTop < element.clientHeight + 500;

      

    if (atBottom && !this.queryExecuted && this.lastEvaluatedKey.pk != 'none') {
      console.log('Llegaste al final del contenedor');

      this.loadingPosts = true;

      //Variable usada para no ejecutar la consulta mas de una vez
      this.queryExecuted = true;

      //Obtiene los siguientes posts al paginar haciendo scroll hacia abajo
/*       this.postsService.getPostsByUser(this.user.lastPostKey).subscribe({
        next: (response) => {
          if (response.posts.length) {
            console.log('responde, ', response.posts)
            let concatArray = this.user.posts.concat(response.posts);
            this.user.posts = concatArray;
            this.user.lastPostKey = response.lastEvaluatedKey;
            this.queryExecuted = false;
            this.loadingPosts = false;
          }
        },
        error: (error) => {
          console.log(error);
          this.queryExecuted = false;
          this.loadingPosts = false;
          this.user.lastPostKey = '';
        },
      }); */
    }
  }
}
