export interface CreateUserInput {
  email: string;
  password: string;
  name: string;
}

export interface CreateUserOutput {
  id: string;
  name: string;
  emailVerified: boolean;
  email: string;
}
