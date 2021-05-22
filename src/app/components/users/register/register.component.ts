import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserInterface } from '../../../shared/models/user';
import { ValidadoresService } from '../../heroes/services/validadores.service';
import { PATRON_EMAIL } from 'src/app/shared/utils/patrones';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  token='';  

  constructor( private authService:AuthService,
    private validate: ValidadoresService,
    private formBuilder: FormBuilder,
    private router:Router ) { }

  ngOnInit(): void {
    this.token =  this.authService.currentToken;
    if(this.token){
       this.router.navigateByUrl('/home');
    }
    this.createForm();
  }

  get invalidName(){
    return this.registerForm.get('name').invalid && this.registerForm.get('name').touched;
  }

  get invalidEmail(){
    return this.registerForm.get('email').invalid && this.registerForm.get('email').touched;
  }

  get invalidPass1(){
    return this.registerForm.get('password').invalid && this.registerForm.get('password').touched;
  }

  get invalidPass2(){
    const PASS1= this.registerForm.get('password').value;
    const PASS2= this.registerForm.get('password2').value;

    return (PASS1 === PASS2) ? false : true && this.registerForm.get('password2').touched;
  }

  createForm(){
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required,Validators.minLength(5)]),
      email: new FormControl('', [Validators.required,Validators.pattern(PATRON_EMAIL)]),
      password: new FormControl('', [Validators.required,Validators.minLength(5)]),
      password2: new FormControl('', Validators.required)
    }, {
      validators: this.validate.MustMatch('password','password2')
  });

  }

  onRegister( user:UserInterface ){
    if(this.registerForm.invalid){
      this.validateData();
      return;
    }
    this.validateData();
    Swal.fire({
      allowOutsideClick:false,
      icon: 'info',
      title: 'Espere por favor...'
      });
    Swal.showLoading();

     this.authService.registerUser(user).subscribe(resp =>{
       Swal.close();
      this.router.navigateByUrl('/home');
     }, (err)=>{
       Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.error.error.message
        })
     });
  }

  validateData(){
    if(this.registerForm.invalid){
       return  Object.values(this.registerForm.controls).forEach(control => {
        if( control instanceof FormGroup ){
          Object.values( control.controls ).forEach(control => control.markAsTouched());
        }else{
          control.markAsTouched();
        }
      });
    }
  }



}
