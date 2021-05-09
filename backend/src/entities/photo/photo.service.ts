import {HttpService, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, DeleteResult} from 'typeorm';
import {from, Observable, Subject} from 'rxjs';
import {Photo} from './photo.entity';
import {map, switchMap, tap} from 'rxjs/operators';
import {TOKEN} from '../../app.service';
import * as Path from "path";
import * as Fs from "fs";
import * as https from "https";
import {v4 as uuid} from 'uuid';

@Injectable()
export class PhotoService {
    constructor(
        @InjectRepository(Photo) private photoRepository: Repository<Photo>,
        private httpService: HttpService,
    ) {}

    downloadPhoto(userId: number, fileTelegramId: string): Observable<string> {
        // Request link for file download
        return this
            .getDownloadUrl(fileTelegramId)
            .pipe(switchMap((filePath) => {
                // Download file be received url
                return this
                    .downloadFile(filePath)
                    .pipe(tap(fileName => {
                        this.savePhoto({
                            userId,
                            fileName: fileName,
                            url: fileTelegramId,
                        });
                    }));
            }));
    }

    getDownloadUrl(fileId: string): Observable<string> {
        return this.httpService
            .get(`https://api.telegram.org/bot${TOKEN}/getFile?file_id=${fileId}`)
            .pipe(map((x) => x.data.result.file_path));
    }

    downloadFile(filePath?: string): Observable<string> {
        let fileName = `${uuid()}.jpg`;
        let url = `https://api.telegram.org/file/bot${TOKEN}/${filePath}`;
        let path = Path.resolve(__dirname, 'images', fileName);
        let file = Fs.createWriteStream(path);

        let res = new Subject<string>();

        https
            .get(url, function (response) {
                response.pipe(file);
                file.on('finish', function () {
                    file.close(); // close() is async, call cb after close completes.
                    res.next(fileName);
                });
            })
            .on('error', function (err) {
                // Handle errors
                console.log(err);
            });
        return res;
    }

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
