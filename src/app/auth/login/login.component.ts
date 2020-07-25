import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import { GlobalState } from '../../app.reducer';
import * as actions from '../../shared/ui.actions';
import { Subscription } from 'rxjs';
import * as auth from '../auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  cargando: boolean;
  store$: Subscription;
  LoginButtonText = 'Login';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<GlobalState>
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['fran2@dvag.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.required]
    });

    this.store$ = this.store.select('ui')
      .subscribe(ui => {
        this.cargando = ui.isLoading;
        console.log('Cargando subs', this.cargando);
      });
  }

  login() {
    /*Swal.fire({
      title: 'Loading...',
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });*/
    this.store.dispatch(actions.isLoading());


    const {email, password} = this.loginForm.value;

    this.authService.login(email, password)
      .then(resp => {
        // Swal.close();
        this.store.dispatch(actions.stopLoading());
        this.router.navigate(['/']);
      })
      .catch(err => {
        Swal.fire({
          title: 'Error!',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      })

  }

  ngOnDestroy() {
    this.store$.unsubscribe();
  }




}
