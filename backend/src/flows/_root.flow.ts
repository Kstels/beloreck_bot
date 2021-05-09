import {Injectable} from '@nestjs/common';
import {CallbackMessage, Message, MessageType} from '../interfaces/message-types';
import {BaseFlow} from './_base.flow';
import {ActiveFlowService} from '../entities/activeFlow/activeFlow.service';
import {WelcomeFlow} from './welcome.flow';
import {FlowType} from './flowsMap';
import {TasksFlow} from './tasks.flow';

@Injectable()
export class FlowService {

    constructor(
        private flowService: ActiveFlowService,
        private welcomeFlow: WelcomeFlow,
        private tasksFlow: TasksFlow,
    ) {
    }

    public respondOnMessage(message: Message) {
        // Check active flow
        this.flowService.findActiveFlow(message.getUserId()).subscribe(activeFlow => {
            if (activeFlow) {
                let flow = this.getFlowByType(<FlowType>activeFlow.type);
                flow.respondOnMessage(message, activeFlow);
                return;
            }

            // Check basic commands
            if (message.type === MessageType.ENTITY && (<any>message.dto).text === '/start') {
                this.welcomeFlow.init(message);
            }
        });
        // if (message.type === MessageType.ENTITY && (<any>message.dto).text === '/settings') {
        //     this.commandsFlow.sendWelcomeMessage(message);
        // }
        // if (message.type === MessageType.ENTITY && (<any>message.dto).text === '/help') {
        //     this.commandsFlow.sendHelpDetails(message);
        // }
        // if (message.type === MessageType.ENTITY && (<any>message.dto).text === '/cancel') {
        //     this.commandsFlow.sendHelpDetails(message);
        //     this.flowService.deleteFlowByUserId(message.getUserId());
        // }
        // if (message.type === MessageType.PHOTO) {
        //     this.documentsFlow.savePhoto(<PhotoMessage>message);
        // }
    }

    reactOnButtonClick(message: CallbackMessage) {
        this.flowService.findActiveFlow(message.getUserId()).subscribe(activeFlow => {
            if (activeFlow) {
                let flow = this.getFlowByType(<FlowType>activeFlow.type)
                flow.respondOnMessage(message, activeFlow);
                return;
            }

            // Check basic commands
            if (message.callback.data === 'Взять новую задачу') {
                this.tasksFlow.init(message);
            }
        });
    }

    getFlowByType(type: FlowType): BaseFlow {
        switch(type) {
            case FlowType.WELCOME_FLOW:
                return this.welcomeFlow;
            case FlowType.TASKS_FLOW:
                return this.tasksFlow;
        }
    }
}
