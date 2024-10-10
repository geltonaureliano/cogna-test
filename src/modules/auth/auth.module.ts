import { Module } from '@nestjs/common';

// Prisma
import { PrismaModule } from '../../prisma/prisma.module';

// Core
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [PrismaModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
