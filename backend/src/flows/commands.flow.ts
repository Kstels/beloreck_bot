import {Injectable} from '@nestjs/common';
import {Messages} from '../messages';
import {Message, MessageType} from '../interfaces/message-types';
import {UsersService} from '../entities/users/users.service';
import {MessageService} from '../services/message.service';

@Injectable()
export class CommandsFlow {
    constructor(
        private userService: UsersService,
        private messageService: MessageService,
    ) {
    }

    sendHelpMessage(message: Message) {
        this.messageService.sendMessage(message.getUserId(), Messages.HELP);
    }

    showCurrentScore(message: Message) {
        this.userService.getUser(message.getUserId()).subscribe(user => {
            this.messageService.sendMessage(
                message.getUserId(),
                Messages.CURRENT_SCORE(user.score),
            );
        });
    }
}
