import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as authActions from '../../auth/auth.actions';
import { GlobalState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  userName = '';
  sub$: Subscription;


  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<GlobalState>) { }



  logout() {
    this.authService.logout().then(
      () => {
        this.router.navigate(['/login']);
        console.log('logout');
        this.store.dispatch(authActions.unSetUser());
    }
    );
  }
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


