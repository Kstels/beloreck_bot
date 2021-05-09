import {BaseFlow, FlowStep} from './_base.flow';
import {ActiveFlowService} from '../entities/activeFlow/activeFlow.service';
import {UsersService} from '../entities/users/users.service';
import {MessageService} from '../services/message.service';
import {CallbackMessage, Message, MessageType} from '../interfaces/message-types';
import {Buttons, Messages} from '../messages';
import {AppService} from '../app.service';
import {PhotoService} from '../entities/photo/photo.service';
import {Injectable} from '@nestjs/common';
import {ActiveFlow} from '../entities/activeFlow/activeFlow.entity';
import {TASK_SCORE, TaskService} from '../entities/tasks/task.service';
import {Task} from '../entities/tasks/task.entity';

@Injectable()
export class TasksFlow extends BaseFlow {
    private task: Task;

    constructor(
        flowService: ActiveFlowService,
        private appService: AppService,
        private userService: UsersService,
        private photoService: PhotoService,
        private tasksService: TaskService,
        private messageService: MessageService,
    ) {
        super(flowService);
    }

    defineSteps(): Record<string, FlowStep> {
        return {
            'selectTask': this.selectTaskStep,
            'photoBefore': this.photoBeforeStep,
            'photoAfter': this.photoAfterStep,
        };
    }

    init(message: Message, flow?: ActiveFlow) {
        this.flowService.saveActiveFlow({
            userId: message.getUserId(),
            type: 'taskFlow',
            step: 'selectTask',
        }).subscribe(flow => {
            super.init(message, flow);
            this.messageService.sendMessage(message.getUserId(), Messages.SELECT_TASK);
        });
    }

    respondOnMessage(message: Message, flow: ActiveFlow) {
        this.tasksService.findByUser(message.getUserId()).subscribe(task => {
            this.task = task;
            super.respondOnMessage(message, flow);
        });
    }

    selectTaskStep(message: CallbackMessage) {
        let taskType = <Buttons>message.getData();

        if (Messages.SELECT_TASK.buttons.includes(taskType)) {
            this.tasksService.createTask(message.getUserId(), <any>taskType).subscribe(() => {
                this.messageService.sendSeveralMessages(message.getUserId(),
                    [
                        Messages.SEND_PHOTO1_MSG1(2),
                        Messages.SEND_PHOTO1_MSG2,
                    ]);
                this.nextStep();
            });
            return;
        }

        if (message.type === MessageType.ENTITY && message.dto.text === '/cancel') {
            this.cancelTask(message.getUserId());
            return;
        }

        this.appService.sendMessage(message.getUserId(), Messages.WRONG_MESSAGE);
    }

    photoBeforeStep(message: Message) {
        if (message.type === MessageType.PHOTO) {

            this.photoService
                .downloadPhoto(message.getUserId(), message.dto.photo[0].file_id)
                .subscribe(() => {
                    this.messageService.sendMessage(
                        message.getUserId(),
                        Messages.SEND_PHOTO2,
                    );
                    this.nextStep();
                });
            return;
        }

        if (message.type === MessageType.ENTITY && message.dto.text === '/cancel') {
            this.cancelTask(message.getUserId());
            return;
        }

        this.appService.sendMessage(message.getUserId(), Messages.WRONG_MESSAGE);
    }

    photoAfterStep(message: Message) {
        let userId = message.getUserId();

        if (message.type === MessageType.PHOTO) {
            this.photoService
                .downloadPhoto(userId, message.dto.photo[0].file_id)
                .subscribe(() => {
                    this.userService.addScores(userId, TASK_SCORE[this.task.type]);

                    this.messageService.sendMessage(
                        message.getUserId(),
                        Messages.PHOTO_RECEIVED,
                    );
                    this.nextStep();
                });
            return;
        }

        if (message.type === MessageType.ENTITY && message.dto.text === '/cancel') {
            this.cancelTask(message.getUserId());
            return;
        }

        this.messageService.sendMessage(message.getUserId(), Messages.WRONG_MESSAGE);
    }

    private cancelTask(userId: number) {
        this.messageService.sendSeveralMessages(userId, [
            Messages.CANCEL_CONFIRMED,
            Messages.TAKE_NEW_TASK,
        ]);
        this.tasksService.deleteTask(userId);
        this.complete();
    }
}
