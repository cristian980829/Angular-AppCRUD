import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/shared/models/heroe.model';
import { HeroesService } from '../../heroes/services/heroes.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  page_number=1;
  page_size=8;
  length_:number;
  heroes:HeroeModel[];

  constructor( private heroService: HeroesService,
                      private router:Router) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
     Swal.fire({
      icon: 'info',
      text:'Cargando datos',
      showConfirmButton: false,
      allowOutsideClick: false
    });
Swal.showLoading();
    this.heroService.getAllHeroes().subscribe(resp=>{
    this.heroes = resp;
    this.length_=this.heroes.length;
    Swal.close();
      // console.log(resp);
    });
  }

  onHeroClick(hero:HeroeModel){
    this.router.navigate(['/hero',hero.id]);
  }

  selectPage(page: string) {
    this.page_number = parseInt(page, 10) || 1;
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }

}
