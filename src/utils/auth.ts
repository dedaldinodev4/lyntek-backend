import bcrypt from 'bcrypt'
import type { User, IUserLogged } from 'src/auth/entities/user.entity';

//* Hashing Password Method *//
export const hashPassword = (password: string): string => {     
  return bcrypt.hashSync(password, 10);
}

export const checkUnEncryptedPasswordIsValid = (unEncryptedPassword: string, password: string): boolean  => {
  return bcrypt.compareSync(unEncryptedPassword, password);
}

export const convertUserLogged = (user: User): IUserLogged => {
  const { id, email, name, role, phone, status } = user;
   const data:IUserLogged = {
    id, name, role, phone, email, status
   }
   return data;
}