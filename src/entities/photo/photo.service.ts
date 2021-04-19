import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, DeleteResult} from 'typeorm';
import {from, Observable} from 'rxjs';
import {Photo} from './photo.entity';

@Injectable()
export class PhotoService {
    constructor(@InjectRepository(Photo) private photoRepository: Repository<Photo>) {}

    getPhoto(id: number): Observable<Photo> {
        return from(
            this.photoRepository.findOne(<any>{
                select: ['id', 'userId', 'fileName', 'url'],
                where: [{id: id}],
            }),
        );
    }

    savePhoto(dto: Partial<Photo>): Observable<Photo> {
        let photo = this.photoRepository.create(dto);
        return from(this.photoRepository.save(photo));
    }

    deletePhoto(photo: Photo): Observable<DeleteResult> {
        return from(this.photoRepository.delete(photo));
    }
}
