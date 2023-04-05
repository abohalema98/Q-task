import { Injectable, NgZone } from '@angular/core';
import { User } from '../services/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Users } from '../../models/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = "http://localhost:3000/api";

  userData: any; 

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private http: HttpClient,

  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }


  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['login']);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['dashboard']);
    });
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['signup']);
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  onloginUser(email: string, password: any) {
    let user = {
      Email: email,
      Password: password
    }
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')

    return this.http.post( "http://localhost:3000/api/login", JSON.stringify(user), { headers: headers })
  }

  getAllUser() {
    return this.http.get<Users[]>("http://localhost:3000/api/users")
  }

  registerUser(newUser: Users) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.http.post<Users>(this.baseUrl + "/signup", newUser)
  }
}
