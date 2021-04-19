import {Injectable, Inject} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, DeleteResult} from 'typeorm';
import {User} from './user.entity';
import {from, Observable, of as observableOf} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

    getUsers(user: User): Observable<User[]> {
        return from(this.usersRepository.find());
    }

    getUser(id: number): Observable<User> {
        return from(
            this.usersRepository.findOne(<any>{
                select: ['id', 'firstName', 'lastName', 'type'],
                where: [{id: id}],
            }),
        );
    }

    createUser(dto: User): Observable<User> {
        let user = this.usersRepository.create(dto);
        return from(this.usersRepository.save(user));
    }

    updateUser(user: User): Observable<User> {
        return from(this.usersRepository.save(user));
    }

    deleteUser(user: User): Observable<DeleteResult> {
        return from(this.usersRepository.delete(user));
    }
}
