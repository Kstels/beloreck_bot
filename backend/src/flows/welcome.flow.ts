import {BaseFlow, FlowStep} from './_base.flow';
import {UsersService} from '../entities/users/users.service';
import {MessageService} from '../services/message.service';
import {Messages} from '../messages';
import {User} from '../entities/users/user.entity';
import {Message, MessageType} from '../interfaces/message-types';
import {ActiveFlowService} from '../entities/activeFlow/activeFlow.service';
import {Injectable} from '@nestjs/common';
import {ActiveFlow} from '../entities/activeFlow/activeFlow.entity';

@Injectable()
export class WelcomeFlow extends BaseFlow {

    constructor(
        flowService: ActiveFlowService,
        private userService: UsersService,
        private messageService: MessageService,
    ) {
        super(flowService);
    }

    init(message: Message, flow?: ActiveFlow) {
        this.flowService.saveActiveFlow({
            userId: message.getUserId(),
            type: 'welcomeFlow',
            step: 'welcome',
        }).subscribe(flow => {
            super.init(message, flow);
            this.welcomeStep(message);
        });
    }

    defineSteps(): Record<string, FlowStep> {
        return {
            'welcome': this.welcomeStep,
            'typeTeamName': this.typeTeamNameStep,
        };
    }

    welcomeStep(message: Message) {
        let userId = message.getUserId();

        this.userService.getUser(userId).subscribe(user => {
            if (user) {
                if (user.teamName) {
                    this.messageService.sendMessage(userId, Messages.USER_ALREADY_EXISTS);
                } else {
                    this.messageService.sendMessage(userId, Messages.TYPE_TEAM_NAME);
                    this.nextStep();
                }
            } else {
                this.userService
                    .createUser(User.fromChat(message.dto.chat))
                    .subscribe(user => {
                        this.messageService.sendSeveralMessages(userId, [
                            Messages.WELCOME_MESSAGE_1,
                            Messages.TYPE_TEAM_NAME,
                        ]);
                        this.nextStep();
                    });
            }
        });
    }

    typeTeamNameStep(message: Message) {
        if (message.type !== MessageType.TEXT) {
            this.messageService.sendMessage(message.getUserId(), Messages.USER_ALREADY_EXISTS);
            return;
        }

        // Check if user with such teamName exists
        this.userService.findUserByTeam(message.dto.text)
            .subscribe(user => {
                if (user) {
                    this.messageService.sendMessage(message.getUserId(), Messages.TEAM_ALREADY_EXISTS);
                    return;
                }

                this.userService.setTeamName(message.getUserId(), message.dto.text)
                    .subscribe(() => {
                        this.messageService.sendSeveralMessages(message.getUserId(), [
                            Messages.TEAM_REGISTERED_SUCCESSFULLY,
                            Messages.WELCOME_MESSAGE_2,
                        ]);
                        this.nextStep();
                    });
            })
    }
}
