import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from '../model/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) { }

  crearIngresoEgreso(ingesoEgreso: IngresoEgreso) {
    return this.firestore.doc(`/ingreso-egreso/${this.authService.user.uid}`)
      .collection('items')
      .add({...ingesoEgreso});
  }
}
