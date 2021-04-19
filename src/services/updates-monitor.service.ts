import {Injectable} from '@nestjs/common';
import {FlowService} from '../flows/_root.flow';
import * as fs from 'fs';
import {Message} from '../interfaces/message';
import {AppService} from '../app.service';

const INTERVAL = 5000;
const OFFSET_STORAGE = 'offset.txt';

@Injectable()
export class UpdatesMonitorService {
    constructor(private flowService: FlowService, private appService: AppService) {}

    public init() {
        setInterval(() => {
            this.getUpdates();
        }, INTERVAL);
    }

    private getUpdates() {
        console.log('Waiting for update...');

        let updateOffset = 0;
        fs.readFile(OFFSET_STORAGE, 'utf8', (err, offset) => {
            if (err) {
                return console.log(err);
            }
            updateOffset = +offset;

            this.appService.getUpdates(updateOffset + 1).subscribe((updates) => {
                updates?.forEach((update) => {
                    let message = Message.create(update.message)
                    updates?.map((x) => console.log(message.toString()));

                    let updateIds = updates?.map((x) => x.update_id);
                    updateOffset = updateIds[updateIds.length - 1];
                    fs.writeFile(OFFSET_STORAGE, String(updateOffset), (err) => {
                        if (err) {
                            return console.log(err);
                        }
                    });

                    this.flowService.respondOnMessage(message);

                    // if (updates.length) {
                    //     controller
                    //         .getFile(updates[0].message.photo[0].file_id)
                    //         .subscribe(filePath => {
                    //             controller.downloadFile(filePath).subscribe();
                    //         });
                    // }
                });
            });
        });
    }
}
