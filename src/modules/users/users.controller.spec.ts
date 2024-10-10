import { Test, TestingModule } from '@nestjs/testing';

// Core
import { UserController } from './users.controller';
import { UserService } from './users.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getAllUsers: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('deve retornar uma matriz de usuários do serviço', async () => {
    const mockUsers = [
      { id: 1, name: 'Pedro', email: 'pedro@email.com' },
      { id: 2, name: 'Bruno', email: 'bruno@email.com' },
    ];

    (userService.getAllUsers as jest.Mock).mockResolvedValue(mockUsers);

    const result = await userController.getAllUsers();

    expect(result).toEqual(mockUsers);
    expect(userService.getAllUsers).toHaveBeenCalled();
  });
});
