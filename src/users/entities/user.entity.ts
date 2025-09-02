import type { Role } from "@prisma/client";

export class User {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: Role;
  status: boolean;
  created_at: Date;
  updated_at: Date;
}