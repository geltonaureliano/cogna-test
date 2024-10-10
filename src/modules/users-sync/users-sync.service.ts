import { Injectable } from '@nestjs/common';

// Prisma
import { PrismaService } from '../../prisma/prisma.service';

// Mock data
import { mockUsers } from './mock/users';

@Injectable()
export class UserSyncService {
  constructor(private prisma: PrismaService) {}

  async syncUsers() {
    for (const user of mockUsers) {
      const { address, company, ...userData } = user;

      const geo = await this.prisma.geo.create({
        data: {
          lat: address.geo.lat,
          lng: address.geo.lng,
        },
      });

      const addressCreated = await this.prisma.address.create({
        data: {
          street: address.street,
          suite: address.suite,
          city: address.city,
          zipcode: address.zipcode,
          geoId: geo.id,
        },
      });

      const companyCreated = await this.prisma.company.create({
        data: {
          name: company.name,
          catchPhrase: company.catchPhrase,
          bs: company.bs,
        },
      });

      await this.prisma.user.create({
        data: {
          ...userData,
          addressId: addressCreated.id,
          companyId: companyCreated.id,
        },
      });
    }
    return { message: 'Users created successfully' };
  }
}
