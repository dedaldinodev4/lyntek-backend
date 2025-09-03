import type { Role } from "@prisma/client";

export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string | null;
  role: Role;
  status: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface IUserLogged {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: Role;
  status: boolean;
}

export interface IUserCurrent {
  user: IUserLogged;
  access_token: string;
}
