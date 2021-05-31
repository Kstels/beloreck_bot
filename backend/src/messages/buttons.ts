import {TaskType} from '../entities/tasks/task.service';

export const Buttons = {
    NEW_TASK: {text: 'Взять новую задачу', callback_data: 'newTask'},

    STOLB_BTN: {text: '1. Столб — 1 балл', callback_data: TaskType.STOLB},
    OSTANOVKA_BTN: {text: '2. Остановка — 2 балла', callback_data: TaskType.OSTANOVKA},
    PODIEZD_BTN: {text: '3. Подъезд — 4 балла', callback_data: TaskType.PODIEZD},
    GARAGE_BTN: {text: '4. Гараж — 2 балла', callback_data: TaskType.GARAGE},
    DESK_BTN: {text: '5. Доска объявлений — 2 балла', callback_data: TaskType.DESK},
};
