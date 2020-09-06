import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from 'src/app/model/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: []
})
export class DetailComponent implements OnInit, OnDestroy {
  io: IngresoEgreso[] = [];
  io$: Subscription;

  constructor(private store: Store<GlobalState>, private ieService: IngresoEgresoService) { }

  ngOnInit() {
    this.io$ = this.store.select('incomeOutcome')
    .subscribe((ie) => {this.io = ie.items; });
  }

  delete(id){
    console.log(id);
    this.ieService.borrarIO(id)
      .then(() => alert('Eintrag erfolgreich gelöscht!'))
      .catch((err) => console.warn(err));
  }

  ngOnDestroy(){
    this.io$.unsubscribe();
  }



}
