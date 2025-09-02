import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: { status: true },
      orderBy: { created_at: 'asc' }
    })
    const usersWithoutPassword = users.map(({ password, ...user }) => user);
    return usersWithoutPassword;
  }

  async findOne(id: string): Promise<User | Error> {
    const user = await this.prisma.user.findFirst({
      where: { id }
    })

    if (!user) {
      throw new NotFoundException(`User does not exist.`)
    }
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword;
  }

  async update(id: string, data: UpdateUserDto): Promise<User | Error> {
    const userExists = await this.prisma.user.findFirst({
      where: { id }
    })

    if (!userExists) {
      throw new NotFoundException(`User does not exists.`)
    }
    const updatedUser = await this.prisma.user.update({
      data,
      where: { id }
    })

    const { password, ...userWithoutPassword } = updatedUser
    return userWithoutPassword;
  }

  async delete(id: string): Promise<void> {
    
    await this.prisma.user.update({
      data: {
        status: false
      },
      where: { id }
    })

  }

}
