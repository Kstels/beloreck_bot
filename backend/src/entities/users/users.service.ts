import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, DeleteResult, UpdateResult} from 'typeorm';
import {User} from './user.entity';
import {from, Observable} from 'rxjs';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

    getUser(id: number): Observable<User> {
        return from(
            this.usersRepository.findOne(<any>{
                select: ['id', 'firstName', 'lastName', 'score'],
                where: [{id: id}],
            }),
        );
    }

    findUserByTeam(team: string): Observable<User> {
        return from(
            this.usersRepository.findOne(<any>{
                select: ['id', 'firstName', 'lastName', 'score'],
                where: [{teamName: team}],
            }),
        );
    }

    setTeamName(userId: number, teamName: string): Observable<UpdateResult> {
        return from(this.usersRepository.update(userId, {teamName}));
    }

    createUser(dto: Partial<User>): Observable<User> {
        let user = this.usersRepository.create(dto);
        return from(this.usersRepository.save(user));
    }

    updateUser(user: User): Observable<User> {
        return from(this.usersRepository.save(user));
    }

    addScores(userId: number, score: number) {
        this.getUser(userId).subscribe(user => {
            this.usersRepository.update(userId, {score: user.score + score})
                .then(() => {});
        });
    }

    deleteUser(user: User): Observable<DeleteResult> {
        return from(this.usersRepository.delete(user));
    }
}
