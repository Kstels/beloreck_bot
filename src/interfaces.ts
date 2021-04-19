export interface Message {
    message_id: number;
    from: {
        id: number;
        is_bot: boolean;
        first_name: string;
        last_name: string;
        language_code: string;
    };
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

export interface UpdateEntry {
    update_id: number;
    message: Message;
}

export interface BaseResponse<T> {
    ok: 'true' | 'false';
    result: T;
}

export declare type UpdateResponse = BaseResponse<UpdateEntry[]>;
