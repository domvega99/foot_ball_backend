import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { EmployeesModule } from './employees/employees.module';
import { TeamsModule } from './football/teams/teams.module';
import { PagesModule } from './pages/pages.module';
import { UploadModule } from './upload/upload.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ormconfig } from 'ormconfig';
import { AuthMiddleware } from './middleware/auth.middleware';
import { UsersController } from './users/users.controller';
import { JwtModule } from '@nestjs/jwt';
import { User } from './users/entities/user.entity';
import { LeaguesModule } from './football/leagues/leagues.module';
import { LeagueTeamsModule } from './football/league_teams/league_teams.module';
import { MatchesModule } from './football/matches/matches.module';
import { ScoresModule } from './football/scores/scores.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: ormconfig,
    }),
    TypeOrmModule.forFeature([User]), // Import TypeOrmModule with User entity
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
    ProductsModule,
    EmployeesModule,
    TeamsModule,
    PagesModule,
    UploadModule,
    AuthModule,
    UsersModule,
    PassportModule.register({ session: true }),
    LeaguesModule,
    LeagueTeamsModule,
    MatchesModule,
    ScoresModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthMiddleware], // Provide AuthMiddleware here if necessary
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'users/register', method: RequestMethod.ALL },
        { path: 'users/google/register', method: RequestMethod.ALL },
        { path: 'users/facebook/register', method: RequestMethod.ALL },
        // Add more routes to exclude here
      )
      .forRoutes(UsersController);
  }
}
