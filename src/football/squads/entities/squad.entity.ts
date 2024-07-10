import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Squad {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    first_name: string;

    @Column({ type: 'varchar', length: 255 })
    middle_name: string;

    @Column({ type: 'varchar', length: 255 })
    last_name: string;

    @Column({ type: 'varchar', length: 45 })
    position: string;

    @Column()
    team_id: number;

    @Column({ nullable: true })
    birth_date: Date;

    @Column({ type: 'text' })
    birth_place: string;

    @Column()
    height: number;

    @Column({ type: 'text' })
    file_name: string;

    @Column({ default: 1 })
    stat: number;
}
