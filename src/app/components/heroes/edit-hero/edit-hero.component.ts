import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { HeroeModel } from '../../../shared/models/heroe.model';
import { HeroesService } from '../services/heroes.service';


@Component({
  selector: 'app-edit-hero',
  templateUrl: './edit-hero.component.html',
  styleUrls: ['./edit-hero.component.css']
})
export class EditHeroComponent implements OnInit {

  @Input() hero: HeroeModel;

  constructor( private heroService:HeroesService,
    private fb: FormBuilder ) { }

  get poderes(){
    return this.editHeroForm.get('poderes') as FormArray;
  }

  public editHeroForm = new FormGroup({
    id: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required),
    universo: new FormControl('', Validators.required),
    poderes: this.fb.array([])
  });

  ngOnInit(): void {
    this.initValuesForm();
  }

  agregarPoderes(){
    this.poderes.push( this.fb.control('') );
  }

  borrarPoderes(i:number){
    this.poderes.removeAt(i);
  }

  editHero(data: HeroeModel) {
    console.log('Hero edit: ', data);
    this.heroService.editHero(data);
  }

  private initValuesForm(): void {
    this.editHeroForm.patchValue({
      id: this.hero.id,
      nombre: this.hero.nombre,
      estado: this.hero.estado,
      universo: this.hero.universo
    });
    this.hero.poderes.forEach(valor => this.poderes.push(this.fb.control(valor))); 
  }

}
