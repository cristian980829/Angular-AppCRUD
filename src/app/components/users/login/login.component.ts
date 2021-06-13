import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import Swal from 'sweetalert2';
import { UserInterface } from '../../../shared/models/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PATRON_EMAIL } from 'src/app/shared/utils/patrones';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  token='';  
  loading=false;

  constructor( private auth: AuthService,
                      private router:Router,
                      private _snackBar: MatSnackBar ) { }

  ngOnInit(): void {
    this.createForm();
    this.rememberEmailOption();
  }

  rememberEmailOption(){
    if(localStorage.getItem('email')){
      this.loginForm.patchValue({
      email: localStorage.getItem('email')
      });
    }
  }

  get invalidEmail(){
    return this.loginForm.get('email').invalid && this.loginForm.get('email').touched;
  }

  get invalidPass(){
    return this.loginForm.get('password').invalid && this.loginForm.get('password').touched;
  }

  createForm(){
    this.loginForm = new FormGroup({
     email: new FormControl('', [Validators.required,Validators.pattern(PATRON_EMAIL)]),
     password: new FormControl('', [Validators.required, Validators.minLength(5)]),
     remember_me: new FormControl('')
   });
  }

  onLogin( user:UserInterface){
    if(this.loginForm.invalid){
      this.validateData();
      return;
    }
    this.loading=true;
    this.auth.login(user).subscribe(resp =>{
      this.openSnackBar();
      if(user.remember_me){
        localStorage.setItem('email', user.email);
      }else{
        localStorage.removeItem('email');
      }

       this.router.navigateByUrl('home/home');
     }, (err)=>{
       this.loading=false;
       Swal.fire({
        icon: 'error',
        title: 'Error al autenticar',
        text: err.error.error.message
        });
     });
    }

    openSnackBar() {
    this._snackBar.open('!Logueado exitosamente!', 'Cerrar', {
      duration: 4 * 1000,
    });
  }

  validateData(){
    if(this.loginForm.invalid){
       return Object.values(this.loginForm.controls).forEach(control => {
        if( control instanceof FormGroup ){
          Object.values( control.controls ).forEach(control => control.markAsTouched());
        }else{
          control.markAsTouched();
          
        }
      });
    }
  }

}
