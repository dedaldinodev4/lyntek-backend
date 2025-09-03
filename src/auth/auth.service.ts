import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma/prisma.service';
import {
  checkUnEncryptedPasswordIsValid,
  convertUserLogged,
  hashPassword
} from 'src/utils/auth';
import { IUserCurrent, IUserLogged } from './entities/user.entity';
import type { IUpdateCredentials } from './dto/update-credentials-auth.dto';

@Injectable()
export class AuthService {

  constructor(private prisma: PrismaService, private jwt: JwtService) { }


  async login(data: LoginAuthDto): Promise<IUserCurrent | Error> {

    const { email, password } = data;
    const user = await this.prisma.user.findFirst({
      where: { email }
    })

    if (user && checkUnEncryptedPasswordIsValid(password, user.password)) {
      const userCurrent = convertUserLogged(user);
      const access_token = this.jwt.sign(
        { user: userCurrent },
        { expiresIn: '30d' },
      )

      const result: IUserCurrent = {
        user: userCurrent,
        access_token
      }
      return result

    }
    throw new BadRequestException('Invalid credentials.')
  }


  async register(data: RegisterAuthDto): Promise<IUserCurrent | Error> {
    const { name, email, role, password, phone } = data;

    const userExist = await this.prisma.user.findFirst({
      where: { email }
    })

    if (userExist) {
      throw new BadRequestException('User already exists.');
    }
    const user = await this.prisma.user.create({
      data: {
        name, email, role,
        password: hashPassword(password), phone
      }
    })

    const userCurrent = convertUserLogged(user);
    const access_token = this.jwt.sign(
      { user: userCurrent },
      { expiresIn: '30d' },
    )

    const result: IUserCurrent = {
      user: userCurrent,
      access_token
    }
    return result;
  }

  async updateCredentials(id: string, data: IUpdateCredentials): Promise<IUserLogged | Error> {
    const { email, currentPassword, newPassword } = data;
    const user = await this.prisma.user.findFirst({
      where: { id }
    })

    if (user &&
      checkUnEncryptedPasswordIsValid(currentPassword, user.password)) {
      const updateUser = await this.prisma.user.update({
        data: {
          email,
          password: hashPassword(newPassword)
        },
        where: { id }
      })

      return convertUserLogged(updateUser)
    }
    throw new BadRequestException('User does not exist.')

  }
}
