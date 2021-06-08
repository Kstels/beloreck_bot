import {HttpService, Injectable} from '@nestjs/common';
import {from, Observable, Subject} from 'rxjs';
import {AxiosResponse} from 'axios';
import {UpdateEntry, UpdateResponse} from './interfaces';
import {map} from 'rxjs/operators';
import * as Path from 'path';
import * as Fs from 'fs';
import * as https from 'https';
import {v4 as uuid} from 'uuid';
import {Buttons} from './messages';

export const TOKEN = '1717333246:AAEImSdBS6fLseBwaW8e2Qqk2At8840iV8o';

@Injectable()
export class AppService {
    constructor(private httpService: HttpService) {}

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

    sendMessage(userId: number, message: any) { // string ||
        let text = null;
        let buttons = null;
        if (typeof message === 'string') {
            text = message;
        } else {
            text = message.text;
            buttons = message.buttons;
        }

        this.httpService.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
            chat_id: userId,
            text: text,
            reply_markup: {
                inline_keyboard: buttons
                    ? buttons.map(x => ([x]))
                    : [],
            },
        }).subscribe();
    }

    getFile(fileId: string): Observable<string> {
        return this.httpService
            .get(`https://api.telegram.org/bot${TOKEN}/getFile?file_id=${fileId}`)
            .pipe(map((x) => x.data.result.file_path));
    }

    downloadFile(filePath?: string): Observable<string> {
        let fileName = `${uuid()}.jpg`;
        let url = `https://api.telegram.org/file/bot${TOKEN}/${filePath}`;
        let path = Path.resolve(__dirname, 'images', fileName);
        let file = Fs.createWriteStream(path);

        let res = new Subject<string>();

        https
            .get(url, function (response) {
                response.pipe(file);
                file.on('finish', function () {
                    file.close(); // close() is async, call cb after close completes.
                    res.next(fileName);
                });
            })
            .on('error', function (err) {
                // Handle errors
                console.log(err);
            });
        return res;
    }
}
