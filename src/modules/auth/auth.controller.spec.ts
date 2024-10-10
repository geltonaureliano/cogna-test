import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';

// Core
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let app: INestApplication;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    app = moduleRef.createNestApplication();

    jest.spyOn(console, 'error').mockImplementation(() => {});

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/POST register', () => {
    it('deve registrar um usuário com sucesso (status 201)', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'newuser@test.com',
          password: '123456',
          name: 'New User',
        })
        .expect(201);
    });

    it('deve lançar exceção se o usuário já existir', () => {
      mockAuthService.register.mockRejectedValueOnce(
        new HttpException('USER_ALREADY_EXISTS', HttpStatus.BAD_REQUEST),
      );

      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'existing@test.com',
          password: '123456',
          name: 'Existing User',
        })
        .expect(400);
    });
  });

  describe('/POST login', () => {
    it('deve fazer login com sucesso e retornar token', () => {
      mockAuthService.login.mockResolvedValueOnce({
        user: {
          id: 1,
          name: 'Test User',
          email: 'test@test.com',
          createdAt: new Date(),
        },
        token: 'mockToken',
      });

      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'test@test.com',
          password: '123456',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.token).toEqual('mockToken');
        });
    });

    it('deve retornar erro se o usuário não for encontrado', () => {
      mockAuthService.login.mockRejectedValueOnce(
        new HttpException('USER_NOT_FOUND', HttpStatus.UNAUTHORIZED),
      );

      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'nonexistent@test.com',
          password: '123456',
        })
        .expect(401);
    });

    it('deve retornar erro se a senha estiver incorreta', () => {
      mockAuthService.login.mockRejectedValueOnce(
        new HttpException('INVALID_CREDENTIALS', HttpStatus.UNAUTHORIZED),
      );

      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'test@test.com',
          password: 'wrongpassword',
        })
        .expect(401);
    });
  });
});
