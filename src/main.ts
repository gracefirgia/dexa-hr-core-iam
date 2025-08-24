import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { ResponseInterceptor } from './common/interceptors/response.interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove properties that don't have decorators
      forbidNonWhitelisted: true, // throw error if non-decorated properties are present
      transform: true, // auto-transform payloads to DTO instances
    }),
  );
  
  app.use(cookieParser());

  app.enableCors({
    origin: '*',
    credentials: true,
  });
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
