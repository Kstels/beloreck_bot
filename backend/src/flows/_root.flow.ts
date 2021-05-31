import {Injectable} from '@nestjs/common';
import {CallbackMessage, Message, MessageType} from '../interfaces/message-types';
import {BaseFlow} from './_base.flow';
import {ActiveFlowService} from '../entities/activeFlow/activeFlow.service';
import {WelcomeFlow} from './welcome.flow';
import {FlowType} from './flowsMap';
import {TasksFlow} from './tasks.flow';
import {CommandsFlow} from './commands.flow';

@Injectable()
export class FlowService {

    constructor(
        private tasksFlow: TasksFlow,
        private welcomeFlow: WelcomeFlow,
        private commandsFlow: CommandsFlow,
        private flowService: ActiveFlowService,
    ) {
    }

    public respondOnMessage(message: Message) {
        if (message.type === MessageType.ENTITY && (<any>message.dto).text === '/help') {
            this.commandsFlow.sendHelpMessage(message);
            return;
        }
        if (message.type === MessageType.ENTITY && (<any>message.dto).text === '/score') {
            this.commandsFlow.showCurrentScore(message);
            return;
        }

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
    }

    reactOnButtonClick(message: CallbackMessage) {
        this.flowService.findActiveFlow(message.getUserId()).subscribe(activeFlow => {
            if (activeFlow) {
                let flow = this.getFlowByType(<FlowType>activeFlow.type)
                flow.respondOnMessage(message, activeFlow);
                return;
            }

            // Check basic commands
            if (message.callback.data === 'newTask') {
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
