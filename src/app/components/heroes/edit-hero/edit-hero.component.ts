import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { HeroeModel } from '../../../shared/models/heroe.model';
import { HeroesService } from '../services/heroes.service';
import { ValidadoresService } from '../services/validadores.service';
import { finalize } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-hero',
  templateUrl: './edit-hero.component.html',
  styleUrls: ['./edit-hero.component.css']
})
export class EditHeroComponent implements OnInit {

  @Input() hero: HeroeModel;
  private image:any;
  private originalImage: any;
  loading:boolean=false;
  
  constructor( private heroService:HeroesService,
    private fb: FormBuilder,
    private validadores: ValidadoresService,
    public dialogRef: MatDialogRef<EditHeroComponent>) { }
    
    ngOnInit(): void {
      this.image = this.hero.imagen;
      this.originalImage = this.hero.imagen;
      this.initValuesForm();
    }

    get invalidName(){
    return this.editHeroForm.get('nombre').invalid && this.editHeroForm.get('nombre').touched;
  }

  get invalidValoration(){
    return this.editHeroForm.get('valoracion').invalid && this.editHeroForm.get('valoracion').touched;
  }

  get poderes(){
    return this.editHeroForm.get('poderes') as FormArray;
  }

  public editHeroForm = new FormGroup({
    id: new FormControl('', Validators.required),
    nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
    estado: new FormControl('', Validators.required),
    universo: new FormControl('', Validators.required),
    heroImage: new FormControl(''),
    poderes: new FormArray([], [Validators.required, this.validadores.powerEntered]),
    valoracion: new FormControl('', [Validators.required, Validators.pattern(/^\d{1}(\.\d{1})?$/), this.validadores.validValoration])
  });


  addPower(){
    this.poderes.push( this.fb.control('') );
  }

  removePower(i:number){
    this.poderes.removeAt(i);
  }

  editHero(hero: HeroeModel) {
    this.loading=true;
    this.validateData();
    if (this.image === this.originalImage) {
      hero.imagen = this.originalImage;
      this.heroService.editHero(hero);
      this.endedProcess();
    } else {
      const DATA = this.heroService.uploadImageAndGetUrl(this.image);
      DATA.task.snapshotChanges()
      .pipe(
        finalize(() => {
          DATA.fileRef.getDownloadURL().subscribe(urlImage => {
            this.heroService.saveHero(hero, urlImage);
            this.endedProcess();
          });
        })
      ).subscribe();
    }
    console.log('Hero edit: ', hero);
  }

  validateData(){
    if(this.editHeroForm.invalid){
       return  Object.values(this.editHeroForm.controls).forEach(control => {
        if( control instanceof FormGroup ){
          Object.values( control.controls ).forEach(control => control.markAsTouched());
        }else{
          control.markAsTouched();
        }
      });
    }
  }

  private initValuesForm(): void {
    this.editHeroForm.patchValue({
      id: this.hero.id,
      nombre: this.hero.nombre,
      estado: this.hero.estado,
      universo: this.hero.universo,
      valoracion: this.hero.valoracion
    });
    this.hero.poderes.forEach(valor => this.poderes.push(this.fb.control(valor))); 
  }

  endedProcess(){
    this.loading=false;
    this.dialogRef.close();
    Swal.fire({
    icon: 'success',
    title: 'Actualizado con exito',
    showConfirmButton: true
    })
  }

  handleImage(event: any): void {
    this.image = event.target.files[0];
  }

}
