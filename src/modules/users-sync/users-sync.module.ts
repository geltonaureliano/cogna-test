import { Module } from '@nestjs/common';

// Prisma
import { PrismaModule } from '../../prisma/prisma.module';

// Core Modules
import { UserSyncService } from './users-sync.service';
import { UserSyncController } from './users-sync.controller';

@Module({
  imports: [PrismaModule],
  providers: [UserSyncService],
  controllers: [UserSyncController],
})
export class UserSyncModule {}
