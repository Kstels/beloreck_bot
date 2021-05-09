import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'tasks'})
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column({length: 32})
    type: string;

    @Column()
    photoBefore: string;

    @Column()
    photoAfter: string;

    @Column()
    approved: boolean;
}
