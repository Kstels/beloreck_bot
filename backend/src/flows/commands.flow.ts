import {Injectable} from '@nestjs/common';
import {AppService} from '../app.service';
import {Messages} from '../messages';
import {Message, MessageType} from '../interfaces/message-types';
import {UsersService} from '../entities/users/users.service';
import {User} from '../entities/users/user.entity';
import {MessageService} from '../services/message.service';

@Injectable()
export class CommandsFlow {
    constructor(
        private appService: AppService,
        private userService: UsersService,
        private messageService: MessageService,
    ) {
    }

    sendWelcomeMessage(message: Message) {
        let userId = message.dto.chat.id;

        this.userService.getUser(userId).subscribe(user => {
            if (user) {
                this.appService.sendMessage(userId, Messages.USER_ALREADY_EXISTS);
            } else {
                this.userService
                    .createUser(User.fromChat(message.dto.chat))
                    .subscribe(user => {
                        this.messageService.sendSeveralMessages(userId, [
                            Messages.WELCOME_MESSAGE_1,
                            Messages.WELCOME_MESSAGE_2,
                        ]);
                    });
            }
        });
    }

    sendHelpDetails(message: Message) {
        this.appService.sendMessage(message.dto.chat.id, Messages.HELP);
    }
}

// export const CommandsFlows = [
//     new Flow((message) => message.type === MessageType.ENTITY && (<any>message.dto).text === '/start',
//         (message) => this),
//
// ];
