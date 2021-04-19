import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {PhotoMessage} from '../../interfaces/message';

@Entity({name: 'photos'})
export class Photo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column({length: 32})
    fileName: string;

    @Column({length: 64})
    url: string;

    static fromMessage(message: PhotoMessage, fileName: string): Partial<Photo> {
        return {
            userId: message.dto.chat.id,
            fileName: fileName,
            url: message.dto.photo[0].file_id,
        };
    }
}
