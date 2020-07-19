import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth,
              private afs: AngularFirestore
              ) { }

  showUserInfo(){
    this.auth.authState.subscribe(fuser => {
      console.log(fuser);
      console.log(fuser ? fuser.uid : 'no user loged in');
    })
  }

  crearUsario(name: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(({user}) => {
        const newUser =  new User( user.uid, name, email);
        return this.afs.doc(`user/${user.uid}`).set({...newUser});
      });
    }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth(){
    return this.auth.authState.pipe(
      map(fuser => {
        return fuser != null;
      })
    )
  }


}
