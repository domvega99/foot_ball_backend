import { LeagueTeam } from 'src/football/league_teams/entities/league_team.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class League {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
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

    @Column({ nullable: true })
    status: string;

    @OneToMany(() => LeagueTeam, leagueTeam => leagueTeam.league)
    teams: LeagueTeam[];
}
