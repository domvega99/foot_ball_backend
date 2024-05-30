import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Team {
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
