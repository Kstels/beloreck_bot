import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'flows'})
export class ActiveFlow {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column({length: 32})
    type: string;

    @Column()
    step: string;
}
