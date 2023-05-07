export interface LoginInput {
  email: string;
  password: string;
}

export interface UserProtected {
  id: string;
  name: string;
  emailVerified: boolean;
  email: string;
}

export interface LoginOutput {
  user: UserProtected;
  token: string;
}
