import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as authActions from '../../auth/auth.actions';
import { GlobalState } from 'src/app/app.reducer';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<GlobalState>) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout().then(
      () => {
        this.router.navigate(['/login']);
        console.log('logout');
        this.store.dispatch(authActions.unSetUser());
    }
    );
  }

}
