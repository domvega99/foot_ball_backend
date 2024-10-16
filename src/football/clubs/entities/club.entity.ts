import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Club {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    province: string;

    @Column()
    municipal: string;

    @Column()
    address: string;

    @Column()
    zipCode: string;

    @Column()
    associationId: number;

    @Column()
    contact: string;

    @Column()
    email: string;

    @Column()
    website: string;

    @Column()
    fbPage: string;

    @Column({ type: 'text' })
    fileName: string;

    @Column({ nullable: true })
    slug: string;

    @Column({ default: 1 })
    stat: number;

    @Column({ nullable: true })
    createdOn: Date;

    @Column({ nullable: true })
    createdBy: number;

    @Column({ nullable: true })
    modifiedOn: Date;

    @Column({ nullable: true })
    modifiedBy: number;
}