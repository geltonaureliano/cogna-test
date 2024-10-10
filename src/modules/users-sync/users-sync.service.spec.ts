import { Test, TestingModule } from '@nestjs/testing';

// Prisma
import { PrismaService } from '../../prisma/prisma.service';

// Core
import { UserSyncService } from './users-sync.service';

// Mock data
import { mockUsers } from './mock/users';

describe('UserSyncService', () => {
  let userSyncService: UserSyncService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserSyncService,
        {
          provide: PrismaService,
          useValue: {
            geo: {
              create: jest.fn(),
            },
            address: {
              create: jest.fn(),
            },
            company: {
              create: jest.fn(),
            },
            user: {
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    userSyncService = module.get<UserSyncService>(UserSyncService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('deve criar usuários a partir de dados simulados', async () => {
    prismaService.geo.create = jest.fn().mockResolvedValue({ id: 1 });
    prismaService.address.create = jest.fn().mockResolvedValue({ id: 1 });
    prismaService.company.create = jest.fn().mockResolvedValue({ id: 1 });
    prismaService.user.create = jest.fn().mockResolvedValue({ id: 1 });

    const result = await userSyncService.syncUsers();

    expect(prismaService.geo.create).toHaveBeenCalledTimes(mockUsers.length);
    expect(prismaService.address.create).toHaveBeenCalledTimes(
      mockUsers.length,
    );
    expect(prismaService.company.create).toHaveBeenCalledTimes(
      mockUsers.length,
    );
    expect(prismaService.user.create).toHaveBeenCalledTimes(mockUsers.length);
    expect(result).toEqual({ message: 'Users created successfully' });
  });
});
