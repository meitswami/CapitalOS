import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  });

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('CapitalOS API')
    .setDescription('Capital Intelligence Operating System - REST API')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Authentication & MFA')
    .addTag('users', 'User Management')
    .addTag('organizations', 'Organization Management')
    .addTag('masters', 'Master Data')
    .addTag('industry', 'Industry Taxonomy')
    .addTag('companies', 'Company Management')
    .addTag('audit', 'Audit Trail')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.API_PORT || 3001;
  await app.listen(port);
  console.log(`CapitalOS API running on http://localhost:${port}`);
  console.log(`Swagger docs: http://localhost:${port}/api/docs`);
}

bootstrap();
