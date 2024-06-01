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
    password: string;

    @Column()
    picture: string;

    @Column()
    email: string;

    @Column()
    provider: string;

    @Column()
    role: string;

    @Column()
    key: string;
}