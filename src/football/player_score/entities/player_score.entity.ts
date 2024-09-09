import { Match } from 'src/football/matches/entities/match.entity';
import { Score } from 'src/football/scores/entities/score.entity';
import { Squad } from 'src/football/squads/entities/squad.entity';
import { Team } from 'src/football/teams/entities/team.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class PlayerScore {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    league_id: number;

    @Column()
    match_id: number;

    @Column()
    player_id: number;

    @Column()
    team_id: number;

    @Column()
    score_id: number;

    @Column()
    minutes: number;

    @Column()
    seconds: number;

    @ManyToOne(() => Squad)
    @JoinColumn({ name: 'player_id' })  
    player: Squad;

    @ManyToOne(() => Score, score => score.playerScores)
    @JoinColumn({ name: 'score_id' })  
    score: Score;



}
