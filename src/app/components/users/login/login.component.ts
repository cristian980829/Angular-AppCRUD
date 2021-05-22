import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import Swal from 'sweetalert2';
import { UserInterface } from '../../../shared/models/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PATRON_EMAIL } from 'src/app/shared/utils/patrones';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  token='';  

  constructor( private auth: AuthService,
                      private router:Router ) { }

  ngOnInit(): void {
    this.token =  this.auth.currentToken;
    if(this.token){
       this.router.navigateByUrl('/home');
    }
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
    Swal.fire({
      allowOutsideClick:false,
      icon: 'info',
      title: 'Iniciando sesión...'
    });
    Swal.showLoading();

    this.auth.login(user).subscribe(resp =>{
      Swal.close();
        
      if(user.remember_me){
        localStorage.setItem('email', user.email);
      }else{
        localStorage.removeItem('email');
      }

       this.router.navigateByUrl('/home');
     }, (err)=>{
       Swal.fire({
        icon: 'error',
        title: 'Error al autenticar',
        text: err.error.error.message
        });
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
