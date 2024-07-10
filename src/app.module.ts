import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
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
import { ContentModule } from './football/content/content.module';
import { ContentController } from './football/content/content.controller';
import { ContentRoleMiddleware } from './middleware/content.role.middleware';
import { SquadsModule } from './football/squads/squads.module';

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
    ContentModule,
    SquadsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthMiddleware], // Provide AuthMiddleware here if necessary
})
export class AppModule {}
