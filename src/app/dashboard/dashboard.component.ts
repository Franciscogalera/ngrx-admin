import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { GlobalState } from '../app.reducer';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { setItems } from '../income-outcome/income-outcome.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  ioSub:Subscription;

  constructor(private store: Store<GlobalState>, private ioService: IngresoEgresoService) { }

  ngOnInit() {
    this.userSub = this.store.select('user')
      .pipe(
        filter(auth => auth.user != null)
        )
      .subscribe(({user}) => {
        this.ioSub = this.ioService.initIncoimeOutcomeListener(user.uid)
        .subscribe((resp) => {
          this.store.dispatch(setItems({items: resp}));
        });
      });
  }

  ngOnDestroy() {
    this.ioSub.unsubscribe();
    this.userSub.unsubscribe();
  }

}
