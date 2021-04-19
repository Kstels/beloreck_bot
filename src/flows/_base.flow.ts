import {Message} from '../interfaces/message';

export interface CheckFn {
    (message: Message): boolean;
}

export interface FlowAction {
    (messages: Message): void;
}

export class Flow {
    private message: Message;
    private executeNext: boolean;

    constructor(private checkFn: CheckFn, private action: FlowAction) {}

    check(message: Message): Flow {
        this.executeNext = this.checkFn(message);
        return this;
    }

    execute() {
        if (this.executeNext) {
            this.action(this.message);
        }
    }
}
