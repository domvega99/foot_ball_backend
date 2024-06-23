import { LeagueTeam } from 'src/football/league_teams/entities/league_team.entity';
import { Match } from 'src/football/matches/entities/match.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class League {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'timestamp' })
    created_on: Date;

    @Column({ nullable: true })
    created_by: number;

    @Column({ nullable: true })
    modified_on: Date;

    @Column({ nullable: true })
    modified_by: number;

    @Column({ default: 1 })
    stat: number;

    @Column({ type: 'varchar', length: 45, nullable: true })
    status: string;

    @OneToMany(() => LeagueTeam, leagueTeam => leagueTeam.league)
    teams: LeagueTeam[];

    @OneToMany(() => Match, match => match.league)
    matches: Match[];
}
