import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TeamAbout {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    team_id: number;

    @Column({ type: 'text' })
    desktop_content: string;

    @Column({ type: 'text' })
    mobile_content: string;

    @Column({ type: 'varchar', length: '45' })
    status: string;
}