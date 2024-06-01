import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
@PrimaryGeneratedColumn()
    id: number;

    @Column()
    given_name: string;

    @Column()
    family_name: string;

    @Column({ nullable: true })
    password: string;

    @Column({ nullable: true })
    picture: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    provider: string;

    @Column({ nullable: true })
    role: string;

    @Column({ nullable: true })
    key: string;

    @Column({ nullable: true })
    facebookId: number;
}