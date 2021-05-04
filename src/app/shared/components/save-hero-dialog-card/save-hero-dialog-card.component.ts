import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from 'src/app/components/heroes/services/validadores.service';
import { HeroeModel } from '../../models/heroe.model';

@Component({
  selector: 'app-save-hero-dialog-card',
  templateUrl: './save-hero-dialog-card.component.html',
  styleUrls: ['./save-hero-dialog-card.component.css']
})
export class SaveHeroDialogCardComponent implements OnInit {

  @Output() hero: EventEmitter<HeroeModel>
  @Output() image_out: EventEmitter<any>
  @Input() hero_to_edit:HeroeModel;

  heroForm:FormGroup;
  loading=false;
  image:any;

  constructor( private fb:FormBuilder,
                      private validadores: ValidadoresService) { 
    this.hero = new EventEmitter();
    this.image_out = new EventEmitter();
  }

  ngOnInit(): void {
    this.createForm();
    if(this.hero_to_edit){
      this.initValuesForm();
    }
  }

  get invalidName(){
    return this.heroForm.get('nombre').invalid && this.heroForm.get('nombre').touched;
  }

  get invalidValoration(){
    return this.heroForm.get('valoracion').invalid && this.heroForm.get('valoracion').touched;
  }

  get poderes(){
    return this.heroForm.get('poderes') as FormArray;
  }

  createForm(){
  if(this.hero_to_edit){
    this.heroForm =new FormGroup({
     id: new FormControl('', Validators.required),
     nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
     estado: new FormControl('', Validators.required),
     universo: new FormControl('', Validators.required),
     imagen: new FormControl(''),
     poderes: new FormArray([], [Validators.required, this.validadores.powerEntered]),
     valoracion: new FormControl('', [Validators.required, Validators.pattern(/^\d{1}(\.\d{1})?$/), this.validadores.validValoration])
   });
  }else{
    this.heroForm =new FormGroup({
     nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
     estado: new FormControl('', Validators.required),
     universo: new FormControl('', Validators.required),
     imagen: new FormControl('', Validators.required),
     poderes: new FormArray([], [Validators.required, this.validadores.powerEntered]),
     valoracion: new FormControl('', [Validators.required, Validators.pattern(/^\d{1}(\.\d{1})?$/), this.validadores.validValoration])
   });
  }
}

addPower(){
    this.poderes.push( this.fb.control('') );
  }

  removePower(i:number){
    this.poderes.removeAt(i);
  }

  createOrAddHero(hero: HeroeModel) {
    this.loading=true;
    this.validateData();
    this.image_out.emit(this.image);
    this.hero.emit(hero);
  }

  validateData(){
    if(this.heroForm.invalid){
       return  Object.values(this.heroForm.controls).forEach(control => {
        if( control instanceof FormGroup ){
          Object.values( control.controls ).forEach(control => control.markAsTouched());
        }else{
          control.markAsTouched();
        }
      });
    }
  }

  handleImage(event: any): void {
    this.image = event.target.files[0];
  }

  private initValuesForm(): void {
    this.heroForm.patchValue({
      id: this.hero_to_edit.id,
      nombre: this.hero_to_edit.nombre,
      estado: this.hero_to_edit.estado,
      universo: this.hero_to_edit.universo,
      valoracion: this.hero_to_edit.valoracion
    });
    this.hero_to_edit.poderes.forEach(valor => this.poderes.push(this.fb.control(valor))); 
  }

}
