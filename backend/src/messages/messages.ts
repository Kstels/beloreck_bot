import {Buttons} from './buttons';

export const Messages = {
    WELCOME_MESSAGE_1: `
        Добро пожаловать в Урбан-патруль Белорецка!
    `,
    WELCOME_MESSAGE_2: {
        text: 'Присылай сюда фотографии До и После и мы посчитаем сколько полезного ты сделал..',
        buttons: [Buttons.NEW_TASK],
    },
    USER_ALREADY_EXISTS: `
        Рады тебя видеть снова! Ты уже зарегистрирован в сервисе.
    `,
    TYPE_TEAM_NAME: `
        Введите название команды
    `,
    TEAM_ALREADY_EXISTS: `
        Команда с таким названием уже существует. Попробуйте другое название
    `,
    TEAM_REGISTERED_SUCCESSFULLY: `
        Отлично! Твоя команда зарегистрирована
    `,
    HELP: `Привет, я помогу тебе разобраться! На данный момент мы поддерживаем следующие команды:
        - /start
        - /help
        - /score
    `,

    CURRENT_SCORE: (score) => `Отличный результат! Количество баллов: ${score}\uD83C\uDF1F,`,

    PHOTO_RECEIVED: {
        text: 'Хорошая работа, так держать! Мы посмотрим фотографии и начислим баллы за задачу',
        buttons: [Buttons.NEW_TASK],
    },
    WRONG_MESSAGE: 'Неверное сообщение',
    CANCEL_CONFIRMED: 'Принято. Текущее задание отменено. Ждём новых задач :)',
    TAKE_NEW_TASK: {
        text: 'Чтобы взять следующую задачу нажми на кнопку ниже \uD83D\uDC47',
        buttons: [Buttons.NEW_TASK],
    },

    SELECT_TASK: {
        text: 'Отлично, давай начнем! Укажи, что будешь очищать:',
        buttons: [
            Buttons.STOLB_BTN,
            Buttons.OSTANOVKA_BTN,
            Buttons.PODIEZD_BTN,
            Buttons.GARAGE_BTN,
            Buttons.DESK_BTN,
        ],
    },

    SEND_PHOTO1_MSG1: (score) => `Отлинчо, за выполнение этой задачи ты получишь ${score} ${score === 1 ? 'балла' : 'баллов'}
(для отмены отправь /cancel)`,
    SEND_PHOTO1_MSG2: 'Пришли фотографию объекта ДО очистки',

    SEND_PHOTO2: 'Пришли фотографию результата очистки объекта',
    CANCEL_MESSAGE: 'Для отмены задачи отправь /cancel',
};
