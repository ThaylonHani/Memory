export interface Post {
  id: string,
  content: string,
  description?: string,
  roomId: string,
  userId: string,
  likes?: [],
}
