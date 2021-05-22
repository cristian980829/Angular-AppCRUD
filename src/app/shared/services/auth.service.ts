import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserInterface } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyBH4ulUcdDLrnjnxKOGKRgf-tFZhoO0LUY';
  userToken:string;

  constructor( private afsAuth: AngularFireAuth, private afs: AngularFirestore,
    private http: HttpClient ) { 
      this.readToken();
     }

  getUser(uid:string): Observable<UserInterface> {
    return this.afs.doc<UserInterface>(`users/${uid}`).valueChanges();
  }

  login( usuario:UserInterface ){
    const AUTHDATA= {
      ...usuario,
      returnSecureToken:true
    };
    return this.http.post(`${this.url}signInWithPassword?key=${this.apiKey}`, AUTHDATA)
    .pipe(map(resp=>{
      this.saveToken(resp['idToken']);
      localStorage.setItem('uid', resp['idToken']);
      this.getUser(resp['localId']).subscribe(data=>{
        for (const rol in data.roles) {
           localStorage.setItem('rol', rol);
        }
      })
      //para que el map no bloquee la respuesta se retorna nuevamente
      return resp;
    }));
  }

  private saveToken( idToken:string ){
    this.userToken=idToken;
    localStorage.setItem('token', idToken);
    let hoy = new Date();
    hoy.setSeconds(3600+hoy.getSeconds());
    localStorage.setItem('expira', hoy.getTime().toString());
  }

  expired(){
      const EXPIRA = Number(localStorage.getItem('expira'));
      const EXPIRADATE = new Date();
      EXPIRADATE.setTime(EXPIRA);
      if( EXPIRADATE > new Date() ){
        return true;
      }else{
        this.clearItems();
        return false;
      }
    }

  clearItems(){
    localStorage.removeItem('token');
    localStorage.removeItem('expira');
    localStorage.removeItem('uid');
    localStorage.removeItem('rol');
  }

  readToken(){
    if(localStorage.getItem('token')){
      this.userToken=localStorage.getItem('token');
    }else{
      this.userToken='';
    }
    return this.userToken;
  }

  registerUser( user:UserInterface ){
    const AUTHDATA= {
      ...user,
      returnSecureToken:true
    };
    return this.http.post(`${this.url}signUp?key=${this.apiKey}`, AUTHDATA)
    .pipe(map(userData=>{
      this.updateUserData(userData, user.name);
      this.saveToken(userData['idToken']);
      //para que el map no bloquee la respuesta se retorna nuevamente
      return userData;
    }));
  }

  private updateUserData(user,name:string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${ user['localId']}`);
    const data: UserInterface = {
      id: user['localId'],
      email: user['email'],
      name,
      roles: {
        observador: true
      }
    }
    return userRef.set(data, { merge: true })
  }

    logoutUser() {
      this.clearItems();
      // localStorage.clear();
      // return this.afsAuth.signOut();
    }

    public get currentToken(): string {
    const token = localStorage.getItem('token');
    return token;
  }

  //   loginEmailUser(user:UserInterface) {
  //   return new Promise((resolve, reject) => {
  //     this.afsAuth.signInWithEmailAndPassword(user.email, user.password)
  //       .then(userData => resolve(userData),
  //       err => reject(err));
  //   });
  // }

  //  registerUser(user:UserInterface) {
  //   return new Promise((resolve, reject) => {
  //     this.afsAuth.createUserWithEmailAndPassword(user.email, user.password)
  //       .then(userData => {
  //         console.log(userData);
  //         resolve(userData),
  //           this.updateUserData(userData.user, user.name);
  //       }).catch(err => console.log(reject(err)))
  //   });
  // }

  




}
