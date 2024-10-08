import { Match } from 'src/football/matches/entities/match.entity';
import { PlayerScore } from 'src/football/player_score/entities/player_score.entity';
import { Team } from 'src/football/teams/entities/team.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class Score {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    match_id: number;

    @Column()
    team_id: number;

    @Column({ default: 0 })
    points: number;

    @Column({ nullable: true })
    result: string;

    @ManyToOne(() => Match, match => match.scores)
    @JoinColumn({ name: 'match_id' }) 
    match: Match;

    @ManyToOne(() => Team, team => team.scores)
    @JoinColumn({ name: 'team_id' }) 
    team: Team;

    @OneToMany(() => PlayerScore, playerScore => playerScore.score)
    playerScores: PlayerScore[];
}