import {Message, UserAction} from '../interfaces/message-types';
import {ActiveFlowService} from '../entities/activeFlow/activeFlow.service';
import {ActiveFlow} from '../entities/activeFlow/activeFlow.entity';

export interface FlowStep {
    (message: Message): void;
}

export abstract class BaseFlow {
    id: number;
    stepIdx = 0;
    steps: Record<string, FlowStep>;
    stepNames: string[];
    flow: ActiveFlow;

    constructor(protected flowService: ActiveFlowService) {
        this.steps = this.defineSteps();
        this.stepNames = Object.keys(this.steps);
    }

    abstract defineSteps(): Record<string, FlowStep>;

    init(action: UserAction, flow: ActiveFlow) {
        this.flow = flow;
        this.stepIdx = this.stepNames.indexOf(flow.step) || 0;
    }

    respondOnMessage(message: Message, flow: ActiveFlow) {
        this.flow = flow;
        this.stepIdx = this.stepNames.indexOf(flow.step) || 0;
        this.steps[flow.step].call(this, message);
    }

    nextStep() {
        if (this.stepIdx < this.stepNames.length - 1) {
            this.stepIdx++;
            let nextStep = this.stepNames[this.stepIdx];
            this.flowService.setStep(this.flow.id, nextStep);
        } else {
            this.complete();
        }
    }

    complete() {
        this.flowService.deleteFlow(this.flow.id)
            .subscribe();
    }
}
