import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔒 Validação global (mantido)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // 🌍 CORS habilitado (recomendado)
  app.enableCors();

  // 🧾 Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Tenda API')
    .setDescription(
      'API do projeto **Tenda** — Marketplace B2B2C de supermercados locais.',
    )
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`🚀 Aplicação rodando em: http://localhost:${port}`);
  console.log(`📘 Swagger disponível em: http://localhost:${port}/api/docs`);
}

bootstrap().catch((err) => {
  console.error('❌ Erro ao iniciar a aplicação:', err);
  process.exit(1);
});
