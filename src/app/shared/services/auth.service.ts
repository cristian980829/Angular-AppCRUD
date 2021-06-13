import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Roles, UserInterface } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyBH4ulUcdDLrnjnxKOGKRgf-tFZhoO0LUY';
  image:any;

  constructor( private afs: AngularFirestore,
                      private http: HttpClient,
                      private router:Router,
                      private _snackBar: MatSnackBar ) { 
  }

  getUser(uid:string): Observable<UserInterface> {
    return this.afs.doc<UserInterface>(`users/${uid}`).valueChanges();
  }
  
  registerUser( user:UserInterface ){    
    const AUTHDATA= {
      ...user,
      returnSecureToken:true
    };
    return this.http.post(`${this.url}signUp?key=${this.apiKey}`, AUTHDATA)
    .pipe(map((userData:UserInterface)=>{
      this.updateUserData(user, userData['localId'] );
      this.saveToken(userData['idToken']);
      localStorage.setItem('rol', Roles.OBSERVER);
      localStorage.setItem('uid', userData['localId']);
      //para que el map no bloquee la respuesta se retorna nuevamente
      return userData;
    }));
  }

  private updateUserData(user:UserInterface, id:string ) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${id}`);
    const data: UserInterface = {
      id: id,
      email: user['email'],
      name:user.name,
      roles: Roles.OBSERVER,
      imagen: user.imagen,
      fileRef: user.fileRef,
    }
    return userRef.set(data, { merge: true })
}

  login( usuario:UserInterface ){
    const AUTHDATA= {
      ...usuario,
      returnSecureToken:true
    };
    return this.http.post(`${this.url}signInWithPassword?key=${this.apiKey}`, AUTHDATA)
    .pipe(map(resp=>{
      this.saveToken(resp['idToken']);
      localStorage.setItem('uid', resp['localId']);
      this.getUser(resp['localId']).subscribe((data:UserInterface)=>{
        localStorage.setItem('rol', data.roles);
        // localStorage.setItem('TypeR', JSON.stringify(data.roles));
        this.image=data.imagen;
      })
      //para que el map no bloquee la respuesta se retorna nuevamente
      return resp;
    }));
  }

  private saveToken( idToken:string ){
    localStorage.setItem('token', idToken);
    let hoy = new Date();
    hoy.setSeconds(3600+hoy.getSeconds());
    localStorage.setItem('expira', hoy.getTime().toString());
  }

  hasRoles(roles): boolean {
    return this.isAuthenticated() && roles.includes(localStorage.getItem('rol'));
  }

  isAuthenticated(): boolean {
    return this.currentToken && this.expired();
  }

  expired():boolean{
      const EXPIRA = Number(localStorage.getItem('expira'));
      const EXPIRADATE = new Date();
      EXPIRADATE.setTime(EXPIRA);
      if( EXPIRADATE > new Date() ){
        return true;
      }else{
        this.logoutUser();
        this._snackBar.open('!ATENCIÓN¡, !su cesión caducó!', 'Cerrar', {
        duration: 4 * 1000,
        });
        return false;
      }
    }

    public get currentToken(): string {
      return localStorage.getItem('token');
    }
    
    public get currentRol(): string {
      return localStorage.getItem('rol');
    }

    logoutUser() {
      this.clearItems();
      this.router.navigateByUrl('/user/login');
    }

  private clearItems(){
    localStorage.removeItem('token');
    localStorage.removeItem('expira');
    localStorage.removeItem('uid');
    localStorage.removeItem('rol');
  }

}
