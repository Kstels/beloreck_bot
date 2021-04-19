import {HttpModule, Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {FlowService} from './flows/_root.flow';
import {CommandsFlow} from './flows/commands.flow';
import {UpdatesMonitorService} from './services/updates-monitor.service';
import {PhotoModule} from './entities/photo/photo.module';
import {UsersModule} from './entities/users/users.module';
import {DocumentsFlow} from './flows/documents.flow';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        HttpModule,
        UsersModule,
        PhotoModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        FlowService,
        CommandsFlow,
        DocumentsFlow,
        UpdatesMonitorService,
    ],
})
export class AppModule {}
