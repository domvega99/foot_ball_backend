import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from './entities/page.entity';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { ContentRoleMiddleware } from 'src/middleware/content.role.middleware';
import { User } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Page, User]),
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [PagesController],
  providers: [PagesService],
})
export class PagesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'football/pages', method: RequestMethod.GET },
        { path: 'football/pages/slug/:params', method: RequestMethod.GET },
      )
      .forRoutes(PagesController);

    consumer
      .apply(AuthMiddleware, ContentRoleMiddleware)
      .exclude(
        { path: 'football/pages', method: RequestMethod.GET },
        { path: 'football/pages/slug/:params', method: RequestMethod.GET },
      )
      .forRoutes(PagesController);
  }
}
