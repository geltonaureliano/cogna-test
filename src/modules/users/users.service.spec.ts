import { Test, TestingModule } from '@nestjs/testing';

// Core
import { UserService } from './users.service';

// Prisma
import { PrismaService } from '../../prisma/prisma.service';

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('deve retornar uma matriz de usuários', async () => {
    const mockUsers = [
      { id: 1, name: 'Pedro', email: 'pedro@email.com' },
      { id: 2, name: 'Bruno', email: 'bruno@email.com' },
    ];

    (prismaService.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

    const result = await userService.getAllUsers();

    expect(result).toEqual(mockUsers);
    expect(prismaService.user.findMany).toHaveBeenCalled();
  });
});
