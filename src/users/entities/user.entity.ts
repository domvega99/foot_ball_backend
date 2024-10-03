import { Coach } from 'src/football/coaches/entities/coach.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';

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
    socialId: string;

    @Column({ nullable: true })
    refreshToken?: string;

    // @ManyToOne(() => Role, (role) => role.users)
    // role: Role;

    @OneToOne(() => Coach, (coach) => coach.user)
    coach: Coach;

}