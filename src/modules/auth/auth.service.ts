import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { compare, hash } from 'bcrypt';

// Prisma
import { PrismaService } from '../../prisma/prisma.service';

// Dto
import { UserLoginRequest, UserLoginResponse } from './dto/login.dto';
import { UserCreateRequest } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(body: UserCreateRequest): Promise<void> {
    const userExists = await this.prisma.credential.findUnique({
      where: { email: body.email },
    });

    if (userExists) {
      throw new HttpException('USER_ALREADY_EXISTS', HttpStatus.BAD_REQUEST);
    }

    const password = await hash(body.password, 10);

    await this.prisma.credential.create({
      data: {
        email: body.email,
        name: body.name,
        password,
      },
    });
  }

  async login(body: UserLoginRequest): Promise<UserLoginResponse> {
    const { email, password } = body;

    const user = await this.prisma.credential.findUnique({
      where: { email },
    });

    if (!user) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.UNAUTHORIZED);
    }

    const areEqual = await compare(password, user.password);

    if (!areEqual) {
      throw new HttpException('INVALID_CREDENTIALS', HttpStatus.UNAUTHORIZED);
    }

    const token = sign({ userId: user.id }, process.env.SECRET_KEY, {
      expiresIn: process.env.SECRET_KEY_EXPIRATION ?? '1d',
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
      token,
    };
  }
}
