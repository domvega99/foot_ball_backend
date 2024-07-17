import { Content } from 'src/football/content/entities/content.entity';
import { LeagueTeam } from 'src/football/league_teams/entities/league_team.entity';
import { Score } from 'src/football/scores/entities/score.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Team {

    @OneToMany(() => LeagueTeam, leagueTeam => leagueTeam.team)
    leagueTeams: LeagueTeam[];

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    team: string;

    @Column()
    coach: string;

    @Column()
    place: string;

    @Column({ type: 'text' })
    file_name: string;

    @OneToMany(() => Score, score => score.team)
    scores: Score[];

    @OneToMany(() => Content, content => content.team)
    contents: Content[];
}