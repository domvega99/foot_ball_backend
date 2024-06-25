import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from './entities/score.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { AdminRoleMiddleware } from 'src/middleware/admin.role.middleware';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Score, User]),
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [ScoresController],
  providers: [ScoresService],
})
export class ScoresModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(ScoresController);

    consumer
      .apply(AuthMiddleware, AdminRoleMiddleware)
      .forRoutes(ScoresController);
  }
}
