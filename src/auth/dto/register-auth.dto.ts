import type { Role } from '@prisma/client';

export class RegisterAuthDto {
  email: string;
  password: string;
  name: string;
  phone?: string;
  role: Role;
}
