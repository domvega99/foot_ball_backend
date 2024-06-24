import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Content {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    block: string;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'varchar', length: 255 })
    file_name: string;

    @Column({ type: 'text', nullable: true })
    content: string;

    @Column({ type: 'timestamp' })
    created_on: Date;

    @Column({ nullable: true })
    created_by: number;

    @Column({ nullable: true })
    modified_on: Date;

    @Column({ nullable: true })
    modified_by: number;

    @Column({ default: 1 })
    stat: number;

    @Column({ type: 'varchar', length: 45, nullable: true })
    status: string;
}