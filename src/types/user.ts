export interface User {
  _id?: string;
  name?: string;
  password?: string;
  role?: string;
  email?: string | undefined;
}

export interface AllUsers {
  pageLength: number;
  page: number;
  pages: number;
  count: number;
  users: User[];
}

export interface LoggedInUser {
  name: string;
  email: string;
  role?: string;
}


