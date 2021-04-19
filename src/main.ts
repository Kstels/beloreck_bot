import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as readline from 'readline';
import {UpdatesMonitorService} from './services/updates-monitor.service';

async function bootstrap() {
    let app = await NestFactory.create(AppModule);
    await app.listen(3000);

    console.log(__dirname);

    let updatesMonitorService = app.get<UpdatesMonitorService>(UpdatesMonitorService);
    updatesMonitorService.init();

    let rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    // let waitCommand = () => {
    //     rl.question('>', (command) => {
    //         if (command === ':q') {
    //             rl.close();
    //             process.exit(0);
    //         }
    //
    //         switch (command) {
    //             case 'deleteWebhook':
    //                 controller.deleteWebhook().subscribe(() => {});
    //                 break;
    //             case 'getUpdate':
    //                 getUpdates(controller, updateOffset);
    //                 break;
    //
    //             case 'sendMessage':
    //                 controller.sendMessage('In the middle of nowhere').subscribe((me) => {
    //                     console.log(JSON.stringify(me.data, null, 2));
    //                 });
    //                 break;
    //
    //             case 'downloadFile':
    //                 controller.downloadFile().subscribe();
    //                 break;
    //
    //             default:
    //                 console.log(`Unsupported command`);
    //                 break;
    //         }
    //
    //         waitCommand();
    //     });
    // };
    //
    // waitCommand();
}

bootstrap();
