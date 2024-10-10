import { ApiProperty } from '@nestjs/swagger';

export class UserLoginRequest {
  @ApiProperty({ example: 'email@email.com' })
  email: string;

  @ApiProperty({ example: 'password' })
  password: string;
}

class UserLoginUserResponse {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Jhon Doe' })
  name: string;

  @ApiProperty({ example: 'email@email.com' })
  email: string;

  @ApiProperty({ example: '2021-08-08T00:00:00.000Z' })
  createdAt: Date;
}

export class UserLoginResponse {
  @ApiProperty({ type: () => UserLoginUserResponse })
  user: UserLoginUserResponse;

  @ApiProperty({ example: 'Bearer JWT token' })
  token: string;
}
