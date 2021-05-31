import {HttpModule, Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {FlowService} from './flows/_root.flow';
import {UpdatesMonitorService} from './services/updates-monitor.service';
import {PhotoModule} from './entities/photo/photo.module';
import {UsersModule} from './entities/users/users.module';
import {WelcomeFlow} from './flows/welcome.flow';
import {ActiveFlowModule} from './entities/activeFlow/activeFlow.module';
import {TasksFlow} from './flows/tasks.flow';
import {MessageService} from './services/message.service';
import {TasksModule} from './entities/tasks/task.module';
import {CommandsFlow} from './flows/commands.flow';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        HttpModule,
        UsersModule,
        PhotoModule,
        TasksModule,
        ActiveFlowModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        FlowService,
        TasksFlow,
        WelcomeFlow,
        CommandsFlow,
        MessageService,
        UpdatesMonitorService,
    ],
})
export class AppModule {}
