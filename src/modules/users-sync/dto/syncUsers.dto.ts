import { ApiProperty } from '@nestjs/swagger';

export class SyncUsersResponse {
  @ApiProperty({ example: 'Users created successfully' })
  message: string;
}

export class SyncUsersUnauthorizedResponse {
  @ApiProperty({ example: 'Unauthorized' })
  message: string;
}
