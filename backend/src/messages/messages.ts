import {Buttons} from './buttons';

export const Messages = {
    WELCOME_MESSAGE_1: `
        Привет дружище! Рады приветствовать тебя в нашей команде по возрождению Белорецка!
        Давай вместе сделаем город лучше.
    `,
    WELCOME_MESSAGE_2: {
        text: 'Присылай сюда фоторафии и мы будем регистрировать их в общей базе данных.',
        buttons: [Buttons.NEW_TASK],
    },
    USER_ALREADY_EXISTS: `
        Привет, рад тебя снова видеть! Я вижу ты уже зарегестрирован в сервисе.
    `,
    TYPE_TEAM_NAME: `
        Введите название команды
    `,
    TEAM_ALREADY_EXISTS: `
        Команда с таким названием уже существует. Попробуйте другое название
    `,
    TEAM_REGISTERED_SUCCESSFULLY: `
        Отлично. Ваша команда зарегестрирована
    `,
    HELP: `Привет! На данный момент мы поддерживаем следующие команды:
        - /help
        - /settings
        - /start
    `,
    PHOTO_RECEIVED: {
        text: 'Вуа, хорошая работа, так держать. После валидвации вам будет начислены очки за выполнение задачи',
        buttons: [Buttons.NEW_TASK],
    },
    WRONG_MESSAGE: 'Неверное сообщение',
    CANCEL_CONFIRMED: 'Принято. Текущее задание отменено. Будем ждать новых проектов ;)',
    TAKE_NEW_TASK: {
        text: 'Чтобы взять следующую задачу нажми на кнопку ниже \uD83D\uDC47',
        buttons: [Buttons.NEW_TASK],
    },

    SELECT_TASK: {
        text: 'Отлично, давай начнем! Укажи тип очищаемой поверхности:',
        buttons: [
            Buttons.STOLB_BTN,
            Buttons.OSTANOVKA_BTN,
            Buttons.PODIEZD_BTN,
            Buttons.GARAGE_BTN,
            Buttons.DESK_BTN,
        ],
    },

    SEND_PHOTO1_MSG1: (score) => `Отлинчо, за выполнение этой задачи вы получите ${score} ${score === 1 ? 'балла' : 'баллов'}
(для отмены отправь /cancel)`,
    SEND_PHOTO1_MSG2: 'Пришлите фотографию объекта до очистки',

    SEND_PHOTO2: 'Пришлите фотографию результата очистки объекта',
    CANCEL_MESSAGE: 'Для отмены задачи отправь /cancel',
};
