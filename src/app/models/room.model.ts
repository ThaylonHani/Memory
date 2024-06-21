export interface Room  {
  id:	String,
  name:	String,
  photo: String,
  users: [{
    id: String,
    name: String,
    photo: String
  }]
}
