import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
// import {User} from '../../../backend/src/entities/users/user.entity';
import {Observable} from 'rxjs';

@Injectable()
export class UsersEndpoints {
  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/app/users', {
      headers: {'Access-Control-Allow-Origin': 'http://localhost:3000'},
    });
  }
}
