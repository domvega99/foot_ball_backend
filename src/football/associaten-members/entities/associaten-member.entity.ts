import { Association } from 'src/football/associations/entities/association.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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

    @Column({ nullable: true })
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

    @ManyToOne(() => Association, association => association.members)
    association: Association;
}
