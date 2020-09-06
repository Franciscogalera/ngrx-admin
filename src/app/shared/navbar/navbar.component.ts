import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {
  userName = '';
  sub$: Subscription;

  constructor(private store:Store<GlobalState>) { }

  ngOnInit() {
    this.sub$ = this.store.select('user')
      .pipe(
        filter(({user}) => user != null))
      .subscribe(({user}) =>
        { this.userName =  user.name;
          })
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

}
