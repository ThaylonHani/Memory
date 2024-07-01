import { Post } from "./post.model"

export interface Room  {
  id?: string ,
  name:	string,
  photo: string,
  users: [{
    id: string,
    name: string,
    photo: string
  }],
  posts?: Post[],
}
