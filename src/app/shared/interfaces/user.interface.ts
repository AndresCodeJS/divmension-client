export interface IUser {
  username: string;
  email: string;
  fullname: string;
  password: string;
  repassword: string;
}

export interface ICredentials{
  username: string;
  password: string;
}

export interface IUserStore {
  username: string;
  email: string;
  fullname: string;
  photoUrl: string
}

export interface IUserList{
  username: string;
  fullname: string;
  photoUrl: string
}