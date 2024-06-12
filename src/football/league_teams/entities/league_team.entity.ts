import { Team } from 'src/football/teams/entities/team.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class LeagueTeam {

    @ManyToOne(() => Team, team => team.leagueTeams)
    @JoinColumn({ name: 'team_id' })
    team: Team;
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    league_id: number;

    @Column()
    team_id: number;

    @Column({ default: 0 })
    played: number;

    @Column({ default: 0 })
    won: number;

    @Column({ default: 0 })
    drawn: number;

    @Column({ default: 0 })
    lost: number;

    @Column({ default: 0 })
    goals_for: number;

    @Column({ default: 0 })
    goals_against: number;

    @Column({ default: 0 })
    goals_difference: number;

    @Column({ default: 0 })
    points: number;

    @Column({ default: 1 })
    stat: number;

    @Column({ nullable: true })
    status: number;
}
