import { AssociatenMember } from 'src/football/associaten-members/entities/associaten-member.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Association {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    orgName: string;

    @Column()
    headOrg: number;

    @Column({ length: 255 })
    province: string;

    @Column({ length: 255 })
    address: string;

    @Column({ length: 255 })
    zipCode: string;

    @Column({ length: 255 })
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

    @OneToMany(() => AssociatenMember, member => member.association)
    members: AssociatenMember[];
}
