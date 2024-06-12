import { LeagueTeam } from 'src/football/league_teams/entities/league_team.entity';
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

    @Column()
    file_name: string;
}
