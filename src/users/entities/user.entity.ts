import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
@PrimaryGeneratedColumn()
    id: number;

    @Column()
    given_name: string;

    @Column()
    family_name: string;

    @Column()
    picture: string;

    @Column()
    email: string;
}