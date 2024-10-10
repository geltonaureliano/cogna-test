import { Injectable } from '@nestjs/common';

// Prisma
import { PrismaService } from '../../prisma/prisma.service';

// Dto
import { GetAllUserResponse } from './dto/getAll.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<GetAllUserResponse[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        phone: true,
        website: true,
        address: {
          select: {
            id: true,
            street: true,
            suite: true,
            city: true,
            zipcode: true,
            geo: {
              select: {
                id: true,
                lat: true,
                lng: true,
              },
            },
          },
        },
        company: {
          select: {
            id: true,
            name: true,
            catchPhrase: true,
            bs: true,
          },
        },
      },
    });
  }
}
