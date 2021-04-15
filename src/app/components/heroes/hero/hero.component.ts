import { Component, OnInit, Input } from '@angular/core';
import { HeroeModel } from 'src/app/shared/models/heroe.model';
import { ActivatedRoute } from '@angular/router';
import { HeroesService } from '../services/heroes.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  @Input() hero: HeroeModel;
  hero$: Observable<HeroeModel>;
  
  constructor( private route: ActivatedRoute, 
    private heroService: HeroesService ) { }
  
  ngOnInit(): void {
    this.hero$ = this.heroService.getOneHero(this.hero);
  }



}
