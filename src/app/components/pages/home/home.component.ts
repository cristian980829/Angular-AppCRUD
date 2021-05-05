import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/shared/models/heroe.model';
import { HeroesService } from '../../heroes/services/heroes.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  heroes:HeroeModel[];

  constructor( private heroService: HeroesService,
                      private router:Router) { }

  ngOnInit(): void {
    this.heroService.getAllHeroes().subscribe(resp=>{
      this.heroes = resp;
      console.log(resp);
    });
  }

  onHeroClick(hero:HeroeModel){
    this.router.navigate(['/hero',hero.id]);
  }

}
