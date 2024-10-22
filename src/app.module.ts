import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsModule } from './football/teams/teams.module';
import { UploadModule } from './upload/upload.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ormconfig } from 'ormconfig';
import { AuthMiddleware } from './middleware/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
import { User } from './users/entities/user.entity';
import { LeaguesModule } from './football/leagues/leagues.module';
import { LeagueTeamsModule } from './football/league_teams/league_teams.module';
import { MatchesModule } from './football/matches/matches.module';
import { ScoresModule } from './football/scores/scores.module';
import { ContentModule } from './football/content/content.module';
import { SquadsModule } from './football/squads/squads.module';
import { TeamAboutModule } from './football/team_about/team_about.module';
import { GalleryModule } from './football/gallery/gallery.module';
import { PagesModule } from './football/pages/pages.module';
import { PlayerScoreModule } from './football/player_score/player_score.module';
import { RolesModule } from './roles/roles.module';
import { CoachesModule } from './football/coaches/coaches.module';
import { AssociationsModule } from './football/associations/associations.module';
import { TeamGroupsModule } from './football/team-groups/team-groups.module';
import { TiersModule } from './football/tiers/tiers.module';
import { AssociatenMembersModule } from './football/associaten-members/associaten-members.module';
import { FootballYearModule } from './football/football-year/football-year.module';
import { PlayerHistoryModule } from './football/player-history/player-history.module';
import { ClubsModule } from './football/clubs/clubs.module';
import { FriendlyMatchesModule } from './football/friendly_matches/friendly_matches.module';
import { FriendlyMatchesModule } from './football/friendly_matches/friendly_matches.module';

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
    PagesModule,
    TeamsModule,
    UploadModule,
    AuthModule,
    UsersModule,
    PassportModule.register({ session: true }),
    LeaguesModule,
    LeagueTeamsModule,
    MatchesModule,
    ScoresModule,
    CoachesModule,
    ContentModule,
    SquadsModule,
    PlayerScoreModule,
    TeamAboutModule,
    GalleryModule,
    RolesModule,
    AssociationsModule,
    TeamGroupsModule,
    TiersModule,
    AssociatenMembersModule,
    FootballYearModule,
    PlayerHistoryModule,
    ClubsModule,
    FriendlyMatchesModule
    FriendlyMatchesModule
  ],
  controllers: [AppController],
  providers: [AppService, AuthMiddleware], // Provide AuthMiddleware here if necessary
})
export class AppModule {}
