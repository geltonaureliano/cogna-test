import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';

// App Module
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger Config
  const options = new DocumentBuilder()
    .setTitle('Cogna Test')
    .setDescription('Swagger documentation')
    .addServer('http://localhost:3000')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const adminDocument = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, adminDocument);

  await app.listen(3000);
}

bootstrap();
