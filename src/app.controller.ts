import {Controller, Get, HttpService} from '@nestjs/common';
import {AppService} from './app.service';
import {Observable} from 'rxjs';
import {AxiosResponse} from 'axios';
import {UpdateEntry, UpdateResponse} from './interfaces';
import {map} from 'rxjs/operators';
import {from} from 'rxjs';
import * as Path from 'path';
import * as Fs from 'fs';
import * as https from 'https';

const TOKEN = '1717333246:AAEImSdBS6fLseBwaW8e2Qqk2At8840iV8o';
const CHAT_ID = '843072399';

@Controller()
export class AppController {
    constructor(private httpService: HttpService, private readonly appService: AppService) {}

    getMe(): Observable<AxiosResponse<any>> {
        return this.httpService.get(`https://api.telegram.org/bot${TOKEN}/getMe`);
    }

    getMyCommands(): Observable<AxiosResponse<any>> {
        return this.httpService.get(`https://api.telegram.org/bot${TOKEN}/getMyCommands`);
    }

    getUpdates(offset?: number): Observable<UpdateEntry[]> {
        return this.httpService
            .get<UpdateResponse>(`https://api.telegram.org/bot${TOKEN}/getUpdates?offset=${offset}`)
            .pipe(map((x) => x.data.result));
    }

    deleteWebhook(): Observable<AxiosResponse> {
        return this.httpService.post(`https://api.telegram.org/bot${TOKEN}/deleteWebhook`);
    }

    sendMessage(message: string): Observable<AxiosResponse<any>> {
        return this.httpService.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: message,
        });
    }

    getFile(fileId: string): Observable<string> {
        return this.httpService
            .get(`https://api.telegram.org/bot${TOKEN}/getFile?file_id=${fileId}`)
            .pipe(map((x) => x.data.result.file_path));
    }

    downloadFile(filePath?: string): Observable<unknown> {
        // // let url = `https://api.telegram.org/file/bot${TOKEN}/${filePath}`;
        let url = `https://api.telegram.org/file/bot${TOKEN}/${filePath}`;
        let path = Path.resolve(__dirname, 'images', 'code.jpg');
        let file = Fs.createWriteStream(path);
        let request = https
            .get(url, function (response) {
                response.pipe(file);
                file.on('finish', function () {
                    file.close(); // close() is async, call cb after close completes.
                });
            })
            .on('error', function (err) {
                // Handle errors
                console.log(err);
            });
        return from([]);
    }
}
