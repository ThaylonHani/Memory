export type User = {
  id: string;
  idToken: string;
  email: string;
  name: string;
  photoUrl: string;
  firstName: string;
  lastName: string;
  provider: string;
}

export type userRoom = Omit<User, 'idToken' | 'email' | 'firstName' | 'lastName' | 'provider'>;
