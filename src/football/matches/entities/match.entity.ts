import { League } from 'src/football/leagues/entities/league.entity';
import { Score } from 'src/football/scores/entities/score.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Match {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    league_id: number;

    @Column()
    match_date: Date;

    @Column({ type: 'time' }) 
    match_time: string;

    @Column({ type: 'varchar', length: 255 })
    location: string;

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

    @OneToMany(() => Score, score => score.match)
    scores: Score[];

    @ManyToOne(() => League, league => league.matches)
    @JoinColumn({ name: 'league_id' })
    league: League;
}