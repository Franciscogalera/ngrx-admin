import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgreso } from '../model/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-income-outcome',
  templateUrl: './income-outcome.component.html',
  styleUrls: ['./income-outcome.component.css']
})
export class IncomeOutcomeComponent implements OnInit {
  ingresoForm: FormGroup;
  tipo = 'ingreso';

  constructor(
    private fb: FormBuilder,
    private ieService: IngresoEgresoService
    ) { }

  ngOnInit() {
    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required]
    })
  }

  guardar() {
    // console.log(this.ingresoForm.value, this.tipo);

    const {descripcion, monto} = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);
    this.ieService.crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        this.ingresoForm.reset();
        alert('Succes');
      })
      .catch((err) => alert(err.message));
  }


}
