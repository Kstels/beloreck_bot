import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {UpdatesMonitorService} from './services/updates-monitor.service';

async function bootstrap() {
    let app = await NestFactory.create(AppModule);
    await app.listen(3000);

    console.log(__dirname);

    let updatesMonitor: UpdatesMonitorService = app.get<UpdatesMonitorService>(UpdatesMonitorService);
    updatesMonitor.init();
}

bootstrap();
