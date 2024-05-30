import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;
    
    @Column()
    dob: string;

    @Column()
    gender: string;

    @Column()
    education: string;

    @Column()
    company: string;

    @Column()
    experience: string;

    @Column()
    package: string;

}
    