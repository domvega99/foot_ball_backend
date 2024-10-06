import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Association {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 20 })
    orgName: string;

    @Column()
    headOrg: number;

    @Column({ length: 50 })
    province: string;

    @Column({ length: 50 })
    address: string;

    @Column({ length: 5 })
    zipcode: string;

    @Column({ length: 20 })
    city: string;

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
