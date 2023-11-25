import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(username: string): Promise<any | null> {
    const user = await this.prisma.user.findUnique({
		where: {
			username
		}
    });
    return user;
 }

  async create(user: Prisma.UserCreateInput): Promise<any> {
    return this.prisma.user.create({
      data: user,
    });
  }
}
