import {Controller, Get, HttpService} from '@nestjs/common';
import {Observable} from 'rxjs';
import {User} from './entities/users/user.entity';
import {UsersService} from './entities/users/users.service';

@Controller('app')
export class AppController {
    constructor(
        private userService: UsersService,
    ) {}

    @Get('users')
    getUsers(): Observable<User[]> {
        return this.userService.getUsers();
    }
}
