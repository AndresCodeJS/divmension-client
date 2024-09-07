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
  commentsQuantity: number 
  }