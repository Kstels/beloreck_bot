import {CallbackQuery} from '../interfaces';
export declare type UserAction = Message | CallbackQuery

export interface IMessage {
    message_id: number;
    from: {
        id: number;
        is_bot: boolean;
        first_name: string;
        last_name: string;
        language_code: string;
    };
    chat: Chat;
    date: number;
    text: string;
    entities: [
        {
            offset: number;
            length: number;
            type: string;
        },
    ];

    photo?: PhotoSize[];
    document?: any;
}

export enum MessageType {
    TEXT = 'TEXT',
    ENTITY = 'ENTITY',
    DOCUMENT = 'ENTITY',
    PHOTO = 'PHOTO',
    BUTTON_CLICK = 'BUTTON',
}

export interface Chat {
    id: number;
    first_name: string;
    last_name: string;
    type: string;
}

export interface PhotoSize {
    file_id: string;
    file_unique_id: string;
    width: number;
    height: number;
    file_size?: number;
}

export class Message {
    type: MessageType;
    constructor(public dto: IMessage) {}

    toString(): string {
        return JSON.stringify(this.dto);
    }

    getUserId(): number {
        return this.dto.chat.id;
    }

    getData(): string {
        return this.dto.text;
    }

    static create(message: IMessage) {
        if (message.entities) return new EntityMessage(message);
        if (message.text) return new TextMessage(message);
        if (message.document) return new DocumentMessage(message);
        if (message.photo) return new PhotoMessage(message);
    }

    static createFromCallback(callback: CallbackQuery): CallbackMessage {
        return new CallbackMessage(callback);
    }
}

export class EntityMessage extends Message {
    constructor(dto: IMessage) {
        super(dto);
        this.type = MessageType.ENTITY;
    }

    toString(): string {
        return JSON.stringify({
            type: MessageType.ENTITY,
            text: this.dto.text,
            entities: this.dto.entities,
        }, null, 2);
    }
}

export class TextMessage extends Message {
    constructor(dto: IMessage) {
        super(dto);
        this.type = MessageType.TEXT;
    }

    toString(): string {
        return JSON.stringify({
            type: MessageType.TEXT,
            text: this.dto.text,
        }, null, 2);
    }
}

export class DocumentMessage extends Message {
    constructor(dto: IMessage) {
        super(dto);
        this.type = MessageType.DOCUMENT;
    }

    toString(): string {
        return JSON.stringify({
            type: MessageType.DOCUMENT,
            document: this.dto.document,
        }, null, 2);
    }
}

export class PhotoMessage extends Message {
    constructor(dto: IMessage) {
        super(dto);
        this.type = MessageType.PHOTO;
    }

    toString(): string {
        return JSON.stringify({
            type: MessageType.PHOTO,
            document: this.dto.photo[this.dto.photo.length - 1],
        }, null, 2);
    }
}

export class CallbackMessage extends Message {
    constructor(public callback: CallbackQuery) {
        super(null);
        this.type = MessageType.BUTTON_CLICK;
    }

    getUserId(): number {
        return this.callback.from.id;
    }

    getData(): string {
        return this.callback.data;
    }

    toString(): string {
        return JSON.stringify({
            type: MessageType.BUTTON_CLICK,
            document: this.dto.document,
        }, null, 2);
    }
}
