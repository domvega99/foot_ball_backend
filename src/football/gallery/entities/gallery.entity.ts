import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Gallery {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    file_name: string;

    @Column()
    team_id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_on: Date;
}