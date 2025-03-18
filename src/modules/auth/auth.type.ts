export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: "admin";
  createdAt?: Date;
  updatedAt?: Date;
  isPasswordCorrect(candidatePassword: string): Promise<boolean>;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
}
