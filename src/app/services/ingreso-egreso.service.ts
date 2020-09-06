import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from '../model/ingreso-egreso.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) { }

  crearIngresoEgreso(ingesoEgreso: IngresoEgreso) {
    delete ingesoEgreso.uid;

    return this.firestore.doc(`/ingreso-egreso/${this.authService.user.uid}`)
      .collection('items')
      .add({...ingesoEgreso});
  }

  initIncoimeOutcomeListener(uid: string) {
    return this.firestore.collection(`ingreso-egreso/${uid}/items`)
    .snapshotChanges()
    .pipe(
      map((snaphot) =>  {
        console.log(snaphot);
        return snaphot.map((all) => {
            return {
              id: all.payload.doc.id,
              ...all.payload.doc.data() as any
            }
        })
      })
    );
  }

  borrarIO(id){
    return this.firestore.doc(`/ingreso-egreso/${this.authService.user.uid}/items/${id}`).delete();
  }
}
