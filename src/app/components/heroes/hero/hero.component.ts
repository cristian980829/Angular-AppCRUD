import { Component, OnInit, Input } from '@angular/core';
import { HeroeModel } from 'src/app/shared/models/heroe.model';
import { ActivatedRoute } from '@angular/router';
import { HeroesService } from '../services/heroes.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  hero:HeroeModel;
  
  constructor( private route: ActivatedRoute, 
    private heroService: HeroesService,
    private _location:Location) { }
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(data=>{
      this.hero = data;
    })
  }

  backClicked() {
    this._location.back();
  }

}
