import {Injectable} from '@nestjs/common';
import {AppService} from '../app.service';

const DELAY = 1000;

@Injectable()
export class MessageService {
    constructor(private appService: AppService) {
    }

    sendMessage(userId: number, message: any) {
        this.appService.sendMessage(userId, message);
    }

    sendSeveralMessages(userId: number, messages: any[]) {
        if (!messages || !messages.length) return;

        let index = 0;
        let intervalId = setInterval(() => {
            if (index < messages.length) {
                this.appService.sendMessage(userId, <string>messages[index++]);
            } else {
                clearInterval(intervalId);
            }
        }, DELAY);
    }
}
