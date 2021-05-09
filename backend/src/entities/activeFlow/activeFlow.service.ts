import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, DeleteResult, UpdateResult} from 'typeorm';
import {from, Observable} from 'rxjs';
import {ActiveFlow} from './activeFlow.entity';
import {BaseFlow} from '../../flows/_base.flow';
import {Message} from '../../interfaces';

@Injectable()
export class ActiveFlowService {
    constructor(@InjectRepository(ActiveFlow) private flowsRepository: Repository<ActiveFlow>) {}

    findActiveFlow(userId: number): Observable<ActiveFlow> {
        return from(
            this.flowsRepository.findOne(<any>{
                select: ['id', 'userId', 'type', 'step'],
                where: [{userId: userId}],
            }),
        );
    }

    // initNewFlow(message: Message) {
    //     let flow: BaseFlow;
    //     this.saveActiveFlow(dto).subscribe(() => {
    //         flow.nextStep();
    //     });
    // }

    // startFlow(userId: number, flow: BaseFlow) {
    //     let activeFlowEntity = this.flowsRepository.create({
    //         userId: userId,
    //         type: flow.type,
    //         step: flow.step,
    //     });
    //     return from(this.flowsRepository.save(activeFlowEntity));
    // }

    setStep(flowId: number, step: string): Observable<UpdateResult> {
        return from(this.flowsRepository.update(flowId, {step}));
    }

    saveActiveFlow(dto: Partial<ActiveFlow>): Observable<ActiveFlow> {
        let flow = this.flowsRepository.create(dto);
        return from(this.flowsRepository.save(flow));
    }

    deleteFlow(flowId: number): Observable<DeleteResult> {
        return from(this.flowsRepository.delete(flowId));
    }

    deleteFlowByUserId(userId: number): Observable<DeleteResult> {
        return from(this.flowsRepository.delete({userId}));
    }
}
