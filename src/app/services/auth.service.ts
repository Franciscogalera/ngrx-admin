import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { User } from '../model/user.model';
import { Store } from '@ngrx/store';
import { GlobalState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSub$: Subscription;
  private _user: User;

  constructor(public auth: AngularFireAuth,
              private afs: AngularFirestore,
              private store: Store<GlobalState>,
              private fireStore: AngularFirestore
              ) { }

  showUserInfo() {
    this.auth.authState.subscribe(fuser => {
      if (fuser) {
        this.userSub$ = this.fireStore.doc(`/user/${fuser.uid}`).valueChanges()
          .subscribe((firesStoreUser: any) => {
            const user = User.fromFirebase(firesStoreUser);
            this._user = user;
            this.store.dispatch(authActions.setUser({user: user}));
          });
      } else {
        console.log('sdfasdfa');

        //this.store.dispatch(authActions.unSetUser);
      }
      //this.userSub$.unsubscribe();
      // console.log(fuser);
      // console.log(fuser ? fuser.uid : 'no user loged in');
    });
  }

  get user() {
    return this._user;
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
