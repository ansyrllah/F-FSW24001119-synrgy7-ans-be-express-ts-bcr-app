export interface LoginAuth {
  email: string;
  password: string;
}

export interface RegisterAuth {
  name: string;
  email: string;
  password: string;
  role: string;
  created_at: Date;
}

export interface AuthJWT {
  name: string;
  email: string;
  role: string;
  token: string;
  expiresIn?: string;
}