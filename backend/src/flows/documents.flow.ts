import {Injectable} from '@nestjs/common';
import {AppService} from '../app.service';
import {Messages} from '../messages';
import {PhotoMessage} from '../interfaces/message-types';
import {PhotoService} from '../entities/photo/photo.service';
import {Photo} from '../entities/photo/photo.entity';
import {UsersService} from '../entities/users/users.service';

@Injectable()
export class DocumentsFlow {
    constructor(
        private appService: AppService,
        private userService: UsersService,
        private photoService: PhotoService,
    ) {
    }

    savePhoto(message: PhotoMessage) {
        let userId = message.dto.chat.id;

        this.appService
            .getFile(message.dto.photo[0].file_id)
            .subscribe(filePath => {
                this.appService.downloadFile(filePath).subscribe(fileName => {
                    this.photoService
                        .savePhoto(Photo.fromMessage(message, fileName))
                        .subscribe(() => {
                            this.appService.sendMessage(userId, Messages.PHOTO_RECEIVED);
                        });
                });
            });
    }
}
