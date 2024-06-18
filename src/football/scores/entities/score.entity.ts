import { Match } from 'src/football/matches/entities/match.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

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

    @ManyToOne(() => Match, match => match.scores)
    @JoinColumn({ name: 'match_id' }) // Ensures the foreign key column is named match_id
    match: Match;
}