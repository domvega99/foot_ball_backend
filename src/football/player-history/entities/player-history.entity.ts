import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PlayerHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    playerId: number;

    @Column()
    clubId: number;

    @Column()
    current: number;

    @Column()
    teamId: number;

    @Column()
    startYearId: number;

    @Column()
    endYearId: number;
}
