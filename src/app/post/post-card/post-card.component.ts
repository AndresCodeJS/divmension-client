import { Component, Input } from '@angular/core';
import { truncateText } from '../../utils/stringManager';
import { elapsedTime } from '../../utils/timeManager';
import { IUserProfile } from '../../shared/interfaces/user.interface';
import { IPostList } from '../../shared/interfaces/post.interface';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [],
  templateUrl: './post-card.component.html',
  styles: ``
})
export class PostCardComponent {

  truncateDescription = truncateText
  postDate = elapsedTime

  @Input() post: IPostList = {
    username: '',
    postId: '',
    description: '',
    timeStamp: 0,
    likesQuantity: 0,
    commentsQuantity: 0,
    imageUrl: ''
  }
  @Input() isProfileView: boolean = false

}
