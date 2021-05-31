import {Routes} from '@angular/router';
import {ScoreComponent} from './score/score.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'score', pathMatch: 'full' },
  { path: 'score', component: ScoreComponent },
];
