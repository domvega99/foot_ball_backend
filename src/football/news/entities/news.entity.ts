import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class News {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({
        type: 'text',  
    })
    content: string;

    @Column({ type: 'timestamp' })
    created_on: Date;

    @Column({ nullable: true })
    created_by: number;

    @Column({ nullable: true })
    modified_on: Date;

    @Column({ nullable: true })
    modified_by: number;

    @Column()
    stat: number;

    @Column({ nullable: true })
    status: string;
}