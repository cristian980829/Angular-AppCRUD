import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { HeroesService } from '../services/heroes.service';
import { HeroeModel } from '../../../shared/models/heroe.model';
import { MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ValidadoresService } from '../services/validadores.service';

@Component({
  selector: 'app-new-hero',
  templateUrl: './new-hero.component.html',
  styleUrls: ['./new-hero.component.css']
})
export class NewHeroComponent implements OnInit {

  imagen:any;
  loading:boolean=false;
  url: Observable<string>;
  newHeroForm:FormGroup;

  constructor( private heroService: HeroesService,
    public dialogRef: MatDialogRef<NewHeroComponent>,
    private fb:FormBuilder,
    private validadores: ValidadoresService) {

       this.createForm();
     }           
    
    
    ngOnInit(): void {
      // console.log(this.newHeroForm);
    }
  
  get invalidName(){
    return this.newHeroForm.get('nombre').invalid && this.newHeroForm.get('nombre').touched;
  }

  get poderes(){
    return this.newHeroForm.get('poderes') as FormArray;
  }

  createForm(){
   this.newHeroForm =new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
    estado: new FormControl('', Validators.required),
    universo: new FormControl('', Validators.required),
    heroImage: new FormControl('', Validators.required),
    poderes: new FormArray([], [Validators.required, this.validadores.noPower]),
  });
}


 addPower(){
    this.poderes.push( this.fb.control('') );
  }

  removePower(i:number){
    this.poderes.removeAt(i);
  }

  addNewHero(hero: HeroeModel) {
    this.validateData();
      this.loading=true;
      const DATA = this.heroService.uploadImageAndGetUrl(this.imagen);
      DATA.task.snapshotChanges()
      .pipe(
        finalize(() => {
          DATA.fileRef.getDownloadURL().subscribe(urlImage => {
            this.heroService.saveHero(hero, urlImage);
            this.loading=false;
            this.dialogRef.close();
            Swal.fire({
             icon: 'success',
             title: 'Registrado exitosamente',
             showConfirmButton: true
            })
          });
        })
      ).subscribe();
  }

  validateData(){
    if(this.newHeroForm.invalid){
       return  Object.values(this.newHeroForm.controls).forEach(control => {
        if( control instanceof FormGroup ){
          Object.values( control.controls ).forEach(control => control.markAsTouched());
        }else{
          control.markAsTouched();
        }
      });
    }
  }

  handleImage(event: any): void {
    this.imagen = event.target.files[0];
  }

}
