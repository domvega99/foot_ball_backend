import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { ContentRoleMiddleware } from 'src/middleware/content.role.middleware';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Module({
  controllers: [ContentController],
  imports: [
    TypeOrmModule.forFeature([Content, User]),
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [ContentService],
})
export class ContentModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(ContentController);

    consumer
      .apply(AuthMiddleware, ContentRoleMiddleware)
      .forRoutes(ContentController);
  }
}
