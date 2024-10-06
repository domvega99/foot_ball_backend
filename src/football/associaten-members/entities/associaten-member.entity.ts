import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AssociatenMember {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    firstName: string;

    @Column({ length: 255 })
    middleName: string;

    @Column({ length: 255 })
    lastName: string;

    @Column()
    birthDate: Date;

    @Column({ length: 255 })
    birthPlace: string;

    @Column({ length: 255 })
    address: string;

    @Column({ length: 255 })
    zipcode: string;

    @Column({ length: 255 })
    phone: string;

    @Column({ length: 255 })
    mail: string;

    @Column({ nullable: true })
    userId: number; 

    @Column({ nullable: true })
    associationId: number; 

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
