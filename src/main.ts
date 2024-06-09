import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as session from 'express-session';
import * as passport from 'passport';
import { ValidationPipe } from '@nestjs/common';
import { AuthMiddleware } from './middleware/auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(session({
    secret: 'asdasdasdasdasdadasdasd',
    saveUninitialized: false,
    resave: false,
    cookie: { secure: false },
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/', // URL prefix for static files
  });
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors({
        origin: true, // Allow requests from all origins
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allow specified HTTP methods
        allowedHeaders: ['Content-Type', 'Authorization'], // Allow specified headers
    });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
