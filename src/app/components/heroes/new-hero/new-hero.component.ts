import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { HeroesService } from '../services/heroes.service';
import { HeroeModel } from '../../../shared/models/heroe.model';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-hero',
  templateUrl: './new-hero.component.html',
  styleUrls: ['./new-hero.component.css']
})
export class NewHeroComponent implements OnInit {

  constructor( private heroService: HeroesService,
                      public dialogRef: MatDialogRef<NewHeroComponent>,
                      private fb:FormBuilder) { }           

  get poderes(){
    return this.newHeroForm.get('poderes') as FormArray;
  }
  
  public newHeroForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required),
    universo: new FormControl('', Validators.required),
    poderes: this.fb.array([])
  });

  ngOnInit(): void {
  }

  agregarPoderes(){
    this.poderes.push( this.fb.control('') );
  }

  borrarPoderes(i:number){
    this.poderes.removeAt(i);
  }

  addNewHero(data: HeroeModel) {
    console.log('New post salu2 ', data);
    this.heroService.saveHero(data);
  }

  // handleImage(event: any): void {
  //   this.image = event.target.files[0];
  // }

}
