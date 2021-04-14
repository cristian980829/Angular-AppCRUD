import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HeroeModel } from '../../../shared/models/heroe.model';
import { HeroesService } from '../services/heroes.service';


@Component({
  selector: 'app-edit-hero',
  templateUrl: './edit-hero.component.html',
  styleUrls: ['./edit-hero.component.css']
})
export class EditHeroComponent implements OnInit {

  @Input() hero: HeroeModel;

  constructor( private heroService:HeroesService ) { }

  public editHeroForm = new FormGroup({
    id: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required),
    universo: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.initValuesForm();
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
  }

}
