import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserInterface } from '../../../shared/models/user';
import { ValidadoresService } from '../../heroes/services/validadores.service';
import { PATRON_EMAIL } from 'src/app/shared/utils/patrones';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFireStorage } from '@angular/fire/storage';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  token='';  

  uploadPercent: Observable<number>;
  loading=false;
  loadingImage: Observable<string>;
  image:any;

  constructor( private authService:AuthService,
    private validate: ValidadoresService,
    private formBuilder: FormBuilder,
    private router:Router,
    private storage: AngularFireStorage,
    private _snackBar: MatSnackBar ) { }

  ngOnInit(): void {
    this.token =  this.authService.currentToken;
    if(this.token){
       this.router.navigateByUrl('home/home');
    }
    this.createForm();
  }

  get invalidName(){
    return this.registerForm.get('name').invalid && this.registerForm.get('name').touched;
  }

  get invalidImage(){
    return this.registerForm.get('image').invalid && this.registerForm.get('image').touched;
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
      image: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required,Validators.minLength(6)]),
      password2: new FormControl('', Validators.required)
    }, {
      validators: this.validate.MustMatch('password','password2')
  });

  }

  onRegister( user:UserInterface ){
    // this.validateData();
    this.loading=true;
    const id = Math.random().toString(36).substring(2);
    const filePath = `users_image/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.image);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => {
      this.loadingImage = ref.getDownloadURL();
      this.loadingImage.subscribe(urlimage=>{
      user.fileRef=filePath;
      user.imagen=urlimage;
      this.authService.registerUser(user).subscribe(resp =>{
      this.openSnackBar();
        this.router.navigateByUrl('/home');
      }, (err)=>{
      this.loading=false;
       Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.error.error.message
        })
     });
    }, (err)=>{
      this.loading=false;
       Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.error.error.message
        })
     });
    })).subscribe();
  }

  openSnackBar() {
    this._snackBar.open('¡Registrado con exito!', 'Cerrar');
  }

  getImage(e) {
    this.image = e.target.files[0];
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
