import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {Chat} from '../../interfaces/message-types';

@Entity({name: 'user'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 32})
    firstName: string;

    @Column({length: 32})
    lastName: string;

    @Column()
    type: string;

    @Column()
    teamName: string;

    @Column()
    score: number;

    static fromChat(chat: Chat): Partial<User> {
        return {
            id: chat.id,
            firstName: chat.first_name,
            lastName: chat.last_name,
            type: chat.type,
        };
    }
}
