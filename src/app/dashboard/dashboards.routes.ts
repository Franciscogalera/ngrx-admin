import { Routes } from '@angular/router';
import { StatisticsComponent } from '../income-outcome/statistics/statistics.component';
import { IncomeOutcomeComponent } from '../income-outcome/income-outcome.component';
import { DetailComponent } from '../income-outcome/detail/detail.component';


export const dashboardRoutes: Routes = [
  { path: '', component: StatisticsComponent},
  { path: 'income-outcome', component: IncomeOutcomeComponent},
  { path: 'detail', component: DetailComponent}
]
