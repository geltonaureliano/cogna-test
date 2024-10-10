import { ApiProperty } from '@nestjs/swagger';

class GetAllUserCompanyResponse {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Doe Enterprises' })
  name: string;

  @ApiProperty({ example: 'Innovating the future' })
  catchPhrase: string;

  @ApiProperty({ example: 'Business Solutions' })
  bs: string;
}

class GetAllUserGeoResponse {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '40.7128' })
  lat: string;

  @ApiProperty({ example: '-74.0060' })
  lng: string;
}

class GetAllUserAddressResponse {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '123 Main St' })
  street: string;

  @ApiProperty({ example: 'Suite 100' })
  suite: string;

  @ApiProperty({ example: 'New York' })
  city: string;

  @ApiProperty({ example: '10001' })
  zipcode: string;

  @ApiProperty({ type: () => GetAllUserGeoResponse })
  geo: GetAllUserGeoResponse;
}

export class GetAllUserResponse {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'johndoe' })
  username: string;

  @ApiProperty({ example: 'johndoe@example.com' })
  email: string;

  @ApiProperty({ type: () => GetAllUserAddressResponse })
  address: GetAllUserAddressResponse;

  @ApiProperty({ example: '1-800-123-4567' })
  phone: string;

  @ApiProperty({ example: 'www.johndoe.com' })
  website: string;

  @ApiProperty({ type: () => GetAllUserCompanyResponse })
  company: GetAllUserCompanyResponse;
}

export class GetAllUserUnauthorizedResponse {
  @ApiProperty({ example: 'Unauthorized' })
  message: string;
}
