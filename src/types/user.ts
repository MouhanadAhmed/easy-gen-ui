export interface User {
  _id?: string;
  name?: string;
  password?: string;
  role?: string;
  email?: string | undefined;
}


export interface LoggedInUser {
  name: string;
  email: string;
  role?: string;
}


