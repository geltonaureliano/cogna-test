import { Controller, Get, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

// Service
import { UserService } from './users.service';

// Dto
import {
  GetAllUserResponse,
  GetAllUserUnauthorizedResponse,
} from './dto/getAll.dto';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @ApiOperation({ summary: 'Route for get all users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '200 Response',
    isArray: true,
    type: GetAllUserResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: '401 Response',
    type: GetAllUserUnauthorizedResponse,
  })
  async getAllUsers(): Promise<GetAllUserResponse[]> {
    return this.userService.getAllUsers();
  }
}
