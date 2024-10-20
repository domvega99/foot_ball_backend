import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FriendlyMatch {
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

    @Column() 
    teamA: string;

    @Column() 
    teamB: string;

    @Column() 
    scoreA: number;

    @Column() 
    scoreB: number;

    @Column() 
    teamResult: number;

    @Column({ nullable: true })
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
}