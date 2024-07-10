import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { AdminRoleMiddleware } from 'src/middleware/admin.role.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'your-secret-key', 
      signOptions: { expiresIn: '20' }, 
    }),],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'users/register', method: RequestMethod.POST },
        { path: 'users/google/register', method: RequestMethod.POST },
        { path: 'users/facebook/register', method: RequestMethod.POST },
      )
      .forRoutes(UsersController)

    consumer
      .apply(AuthMiddleware, AdminRoleMiddleware)
      .exclude(
        { path: 'users/register', method: RequestMethod.POST },
        { path: 'users/google/register', method: RequestMethod.POST },
        { path: 'users/facebook/register', method: RequestMethod.POST },
      )
      .forRoutes(UsersController);
  }
}
