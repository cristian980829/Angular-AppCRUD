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

  length_:number;
  page = 1;
  pageSize =8;
  validate:boolean;
  heroes:HeroeModel[];
  rol:string;


  constructor( private heroService: HeroesService,
                      private router:Router) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(){
     Swal.fire({
      icon: 'info',
      text:'Cargando datos',
      showConfirmButton: false,
      allowOutsideClick: false
    });
    Swal.showLoading();
    this.heroService.getAllHeroes().subscribe(heroes=>{
      heroes.sort((a, b) => {
        const n = a.nombre.toLocaleLowerCase().localeCompare(b.nombre.toLocaleLowerCase());
        return n === 0 && a !== b ? b.nombre.localeCompare(a.nombre) : n;
      });
    
      this.heroes = heroes;
      this.length_=this.heroes.length;
      Swal.close();
    });
  }

  onHeroClick(hero:HeroeModel){
    this.router.navigate(['/hero',hero.id]);
  }

  selectPage(page: string,pages_num:number) {
    if(parseInt(page)>pages_num){
      return;
    }
    this.page = parseInt(page, 10) || 1;
  }

  dataPerPage(page: number) {
    this.validate=false;
    if(page>this.heroes.length){
      this.validate=true;
      return;
    }
    if(!page){
      return;
    }
    this.pageSize =page;
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }

}
