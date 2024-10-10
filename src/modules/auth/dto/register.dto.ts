import { ApiProperty } from '@nestjs/swagger';

export class UserCreateRequest {
  @ApiProperty({ example: 'Jhon Doe' })
  name: string;

  @ApiProperty({ example: 'email@email.com' })
  email: string;

  @ApiProperty({ example: 'password' })
  password: string;
}

export class UserCreateErrorResponse {
  @ApiProperty({ example: 'User already exists' })
  message: string;
}
