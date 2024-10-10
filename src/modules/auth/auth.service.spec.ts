import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

// Core
import { AuthService } from './auth.service';

// Prisma
import { PrismaService } from '../../prisma/prisma.service';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('AuthService', () => {
  let service: AuthService;

  const mockPrismaService = {
    credential: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('deve registrar um novo usuário com sucesso', async () => {
      mockPrismaService.credential.findUnique.mockResolvedValue(null);

      (hash as jest.Mock).mockResolvedValue('hashedPassword');

      await service.register({
        email: 'test@test.com',
        password: '123456',
        name: 'Test User',
      });

      expect(mockPrismaService.credential.create).toHaveBeenCalledWith({
        data: {
          email: 'test@test.com',
          password: 'hashedPassword',
          name: 'Test User',
        },
      });
    });

    it('deve lançar exceção se o usuário já existir', async () => {
      mockPrismaService.credential.findUnique.mockResolvedValue({ id: 1 });

      await expect(
        service.register({
          email: 'existing@test.com',
          password: '123456',
          name: 'Existing User',
        }),
      ).rejects.toThrow(
        new HttpException('USER_ALREADY_EXISTS', HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('login', () => {
    it('deve fazer login com sucesso', async () => {
      const mockUser = {
        id: 1,
        email: 'test@test.com',
        password: 'hashedPassword',
        name: 'Test User',
        createdAt: new Date(),
      };

      mockPrismaService.credential.findUnique.mockResolvedValue(mockUser);

      (compare as jest.Mock).mockResolvedValue(true);

      (sign as jest.Mock).mockReturnValue('mockToken');

      const result = await service.login({
        email: 'test@test.com',
        password: '123456',
      });

      expect(result).toEqual({
        user: {
          id: mockUser.id,
          name: mockUser.name,
          email: mockUser.email,
          createdAt: mockUser.createdAt,
        },
        token: 'mockToken',
      });
    });

    it('deve lançar exceção se o usuário não for encontrado', async () => {
      mockPrismaService.credential.findUnique.mockResolvedValue(null);

      await expect(
        service.login({ email: 'nonexistent@test.com', password: '123456' }),
      ).rejects.toThrow(
        new HttpException('USER_NOT_FOUND', HttpStatus.UNAUTHORIZED),
      );
    });

    it('deve lançar exceção se a senha estiver incorreta', async () => {
      const mockUser = {
        id: 1,
        email: 'test@test.com',
        password: 'hashedPassword',
        name: 'Test User',
        createdAt: new Date(),
      };

      mockPrismaService.credential.findUnique.mockResolvedValue(mockUser);
      (compare as jest.Mock).mockResolvedValue(false);

      await expect(
        service.login({ email: 'test@test.com', password: 'wrongpassword' }),
      ).rejects.toThrow(
        new HttpException('INVALID_CREDENTIALS', HttpStatus.UNAUTHORIZED),
      );
    });
  });
});
