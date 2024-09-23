import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});

  // Configuración del ValidationPipe globalmente
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Transformar automáticamente las entradas a los tipos definidos en los DTOs
    whitelist: true, // Eliminar propiedades no definidas en los DTOs
    forbidNonWhitelisted: true, // Rechazar solicitudes con propiedades no definidas en los DTOs
  }));

  await app.listen(3000);
}
bootstrap();
