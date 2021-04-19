import {Injectable} from '@nestjs/common';
import {Message, MessageType, PhotoMessage} from '../interfaces/message';
import {CommandsFlow} from './commands.flow';
import {Flow} from './_base.flow';
import {DocumentsFlow} from './documents.flow';

@Injectable()
export class FlowService {
    private flows: Flow[];

    constructor(
        private commandsFlow: CommandsFlow,
        private documentsFlow: DocumentsFlow,
    ) {
    }

    public respondOnMessage(message: Message) {
        if (message.type === MessageType.ENTITY && (<any>message.dto).text === '/start') {
            this.commandsFlow.sendWelcomeMessage(message);
        }
        if (message.type === MessageType.ENTITY && (<any>message.dto).text === '/settings') {
            this.commandsFlow.sendWelcomeMessage(message);
        }
        if (message.type === MessageType.ENTITY && (<any>message.dto).text === '/help') {
            this.commandsFlow.sendHelpDetails(message);
        }
        if (message.type === MessageType.PHOTO) {
            this.documentsFlow.savePhoto(<PhotoMessage>message);
        }

        // this.flows.forEach(flow => {
        //     flow.check(message).execute();
        // });
    }
}
