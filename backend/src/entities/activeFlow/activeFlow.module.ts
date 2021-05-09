import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ActiveFlow} from './activeFlow.entity';
import {ActiveFlowService} from './activeFlow.service';

@Module({
    imports: [TypeOrmModule.forFeature([ActiveFlow])],
    providers: [ActiveFlowService],
    exports: [ActiveFlowService],
})
export class ActiveFlowModule {}
