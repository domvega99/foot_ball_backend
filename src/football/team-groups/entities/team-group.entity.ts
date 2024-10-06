import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TeamGroup {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 20 })
    groupName: string;

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
