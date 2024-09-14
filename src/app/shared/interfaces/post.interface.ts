export interface IPost {
  description: string;
  imageUrl: string;
}

export interface IPostList {
  username: string,
  postId: string,
  imageUrl:string,
  description: string,
  shortDescription?:string,
  timeStamp: number
  likesQuantity: number,
  isLiked?:boolean,
  commentsQuantity: number 
  }

  export interface IComment {
    commentId:string,
    user: string,
    imageUrl: string,
    content: string,
    timeStamp: number
  }

  export interface LastEvaluatedKey{
    pk: string,
    sk:string
  }