import {Component, OnInit} from '@angular/core';
import {UsersEndpoints} from '../../endpoints/users.endpoints';
import {orderBy} from 'lodash-es';

@Component({
    selector: 'app-score',
    templateUrl: './score.template.html',
    styleUrls: ['./score.style.scss'],
})
export class ScoreComponent implements OnInit {
    list = [
      {name: 'Звери', tasks: 52, score: 522},
      {name: 'Работник месяца', tasks: 28, score: 288},
      {name: 'Школа №14', tasks: 32, score: 286},
      {name: 'Patriot', tasks: 14, score: 172},
      {name: 'Bloreck forever', tasks: 8, score: 166},
    ];

    constructor(
      private usersApi: UsersEndpoints,
    ) {
    }

    ngOnInit() {
      this.usersApi.getUsers().subscribe(users => {
        this.list = users.map(u => ({
          name: u.teamName || `${u.firstName} ${u.lastName}`,
          tasks: 52,
          score: u.score,
        }));
        this.list = orderBy(this.list, ['score'], ['desc']);
      });
    }
}
