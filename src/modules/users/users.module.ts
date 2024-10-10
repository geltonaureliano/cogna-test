import { Module } from '@nestjs/common';

// Prisma
import { PrismaModule } from '../../prisma/prisma.module';

// Core Modules
import { UserService } from './users.service';
import { UserController } from './users.controller';

@Module({
  imports: [PrismaModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
