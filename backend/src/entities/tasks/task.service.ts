import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, DeleteResult, UpdateResult} from 'typeorm';
import {from, Observable} from 'rxjs';
import {Task} from './task.entity';

export enum TaskType {
    STOLB = 'stolb',
    OSTANOVKA = 'ostanovka',
    PODIEZD = 'podiezd',
    GARAGE = 'garage',
    DESK = 'desk',
}

export const TASK_SCORE: Record<TaskType, number> = {
    [TaskType.STOLB]: 1,
    [TaskType.OSTANOVKA]: 2,
    [TaskType.PODIEZD]: 4,
    [TaskType.GARAGE]: 2,
    [TaskType.DESK]: 2,
};


@Injectable()
export class TaskService {
    constructor(@InjectRepository(Task) private tasksRepository: Repository<Task>) {}

    getTask(taskId: number): Observable<Task> {
        return from(
            this.tasksRepository.findOne(<any>{
                select: ['id', 'userId', 'type', 'photoBefore', 'photoAfter', 'approved'],
                where: [{id: taskId}],
            }),
        );
    }

    findByUser(userId: number): Observable<Task> {
        return from(
            this.tasksRepository.findOne(<any>{
                select: ['id', 'userId', 'type', 'photoBefore', 'photoAfter', 'approved'],
                where: [{userId}],
                order: {'id': 'DESC'},
            }),
        );
    }

    createTask(userId: number, taskType: TaskType): Observable<Task> {
        let task = this.tasksRepository.create({userId, type: <string> taskType});
        return from(this.tasksRepository.save(task));
    }

    setPhotoBefore(taskId: number, pathToPhoto: string): Observable<UpdateResult> {
        return from(this.tasksRepository.update(taskId, {photoBefore: pathToPhoto}));
    }

    setPhotoAfter(taskId: number, pathToPhoto: string): Observable<UpdateResult> {
        return from(this.tasksRepository.update(taskId, {photoAfter: pathToPhoto}));
    }

    deleteTask(userId: number): Observable<DeleteResult> {
        return from(this.tasksRepository.delete({userId}));
    }
}
