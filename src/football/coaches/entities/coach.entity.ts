import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Coach {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    firstName: string;

    @Column({ length: 50, nullable: true })
    middleName: string;

    @Column({ length: 50 })
    lastName: string;

    @Column({ nullable: true })
    birthDate: Date;

    @Column({ length: 50 })
    birthPlace: string;

    @Column({ length: 50 })
    address: string;

    @Column({ length: 50 })
    zipCode: string;

    @Column()
    phone: number;

    @Column({ length: 30 })
    email: string;

    @Column({ nullable: true })
    userId: number; 

    @Column({ nullable: true })
    teamId: number; 

    @Column({ nullable: true })
    clubId: number; 

    @ManyToOne(() => User, (user) => user.coach)
    user: User;
}
