export interface Post {
  id?: string;
  content: string;
  description?: string;
  roomId: string;
  userId: string;
  likes?: [];
  comments?: CommentPost[];
}

export type CommentPost = {
  id?: string;
  userId: string;
  name:string;
  photoUrl:string;
  text: string;
  postId: string;
};
