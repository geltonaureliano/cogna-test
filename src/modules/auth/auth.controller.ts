import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// Core
import { AuthService } from './auth.service';

// Dto
import { UserLoginRequest, UserLoginResponse } from './dto/login.dto';
import { UserCreateRequest, UserCreateErrorResponse } from './dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Route for user login' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: '200 Response',
    type: UserLoginResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: '401 Response',
  })
  public async login(
    @Body() body: UserLoginRequest,
  ): Promise<UserLoginResponse> {
    return await this.authService.login(body);
  }

  @Post('register')
  @ApiOperation({ summary: 'Route for register new user' })
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: '201 Response',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '400 Response',
    type: UserCreateErrorResponse,
  })
  public async validation(@Body() body: UserCreateRequest): Promise<void> {
    await this.authService.register(body);
  }
}
