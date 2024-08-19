export interface Users {
  name: string;
  email: string;
  password: string;
  role: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface CreateUsers {
  name: string;
  email: string;
  password: string;
  role: string;
  created_at: Date;
}

export interface UpdateUsers {
  name: string;
  email: string;
  password?: string;
  role?: string;
  updated_at: Date;
}
