import { Controller, Get, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

// Service
import { UserSyncService } from './users-sync.service';

// Dto
import {
  SyncUsersResponse,
  SyncUsersUnauthorizedResponse,
} from './dto/syncUsers.dto';

@ApiBearerAuth()
@ApiTags('Users Sync')
@Controller('sync-users')
export class UserSyncController {
  constructor(private readonly userSyncService: UserSyncService) {}

  @Get('/')
  @ApiOperation({ summary: 'Route for sync users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '200 Response',
    type: SyncUsersResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: '401 Response',
    type: SyncUsersUnauthorizedResponse,
  })
  async syncUsers() {
    return this.userSyncService.syncUsers();
  }
}
