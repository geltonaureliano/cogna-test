import { Test, TestingModule } from '@nestjs/testing';

// Core
import { UserSyncController } from './users-sync.controller';
import { UserSyncService } from './users-sync.service';

describe('UserSyncController', () => {
  let userSyncController: UserSyncController;
  let userSyncService: UserSyncService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserSyncController],
      providers: [
        {
          provide: UserSyncService,
          useValue: {
            syncUsers: jest
              .fn()
              .mockResolvedValue({ message: 'Users created successfully' }),
          },
        },
      ],
    }).compile();

    userSyncController = module.get<UserSyncController>(UserSyncController);
    userSyncService = module.get<UserSyncService>(UserSyncService);
  });

  it('deve chamar syncUsers e retornar o resultado', async () => {
    const result = await userSyncController.syncUsers();
    expect(result).toEqual({ message: 'Users created successfully' });
    expect(userSyncService.syncUsers).toHaveBeenCalled();
  });
});
