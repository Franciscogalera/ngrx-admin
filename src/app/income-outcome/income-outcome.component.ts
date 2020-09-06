import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgreso } from '../model/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { Store } from '@ngrx/store';
import { State } from '../shared/ui.reducer';
import { GlobalState } from '../app.reducer';
import * as actions from '../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-income-outcome',
  templateUrl: './income-outcome.component.html',
  styleUrls: ['./income-outcome.component.css']
})
export class IncomeOutcomeComponent implements OnInit, OnDestroy {
  ingresoForm: FormGroup;
  tipo = 'ingreso';
  isLoading: boolean;
  loading$: Subscription;

  constructor(
    private fb: FormBuilder,
    private ieService: IngresoEgresoService,
    private store: Store<GlobalState>
    ) { }

  ngOnInit() {
    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required]
    });

    this.loading$ = this.store.select('ui')
      .subscribe((ui) => {
        this.isLoading = ui.isLoading;
      }
      );
  }

  ngOnDestroy() {
    this.loading$.unsubscribe();
  }

  guardar() {
    // console.log(this.ingresoForm.value, this.tipo);


    this.store.dispatch(actions.isLoading());



    const {descripcion, monto} = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);
    this.ieService.crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        this.ingresoForm.reset();
        alert('Succes');
        this.store.dispatch(actions.stopLoading());
      })
      .catch((err) => alert(err.message));
  }


}
