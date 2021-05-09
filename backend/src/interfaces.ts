export interface TelegramUser {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name: string;
    language_code: string;
}

export interface Message {
    message_id: number;
    from: TelegramUser;
    chat: {
        id: number;
        first_name: string;
        last_name: string;
        type: string;
    };
    date: number;
    text: string;
    entities: [
        {
            offset: number;
            length: number;
            type: string;
        },
    ];

    photo?: any[];
}

export interface CallbackQuery {
    id: string;
    from: TelegramUser;
    inline_message_id: string;
    chat_instance: string;
    message: Message;
    data: string;
}

export interface UpdateEntry {
    update_id: number;
    message?: Message;
    callback_query?: CallbackQuery;
}

export interface BaseResponse<T> {
    ok: 'true' | 'false';
    result: T;
}

export declare type UpdateResponse = BaseResponse<UpdateEntry[]>;
