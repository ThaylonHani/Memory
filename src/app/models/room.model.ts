import { Post } from "./post.model"

export type Room = {
  id?: string,
  pass: string,
  name:	string,
  photo: string,
  users: [{
    id: string,
    name: string,
    photoUrl: string
  }],
  posts?: Post[],
}

export type enterRoom = Omit<Room, 'name' | 'photo' | 'users' | 'posts'>;
