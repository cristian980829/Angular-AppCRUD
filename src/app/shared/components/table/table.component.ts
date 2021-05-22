import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { HeroeModel } from '../../models/heroe.model';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { HeroesService } from '../../../components/heroes/services/heroes.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource();
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  loading=false;
  columnas: string[] = ['Numero','Nombre', 'Estado', 'Universo', 'Tools'];
    
  constructor( private heroService: HeroesService,
                      public dialog: MatDialog ) { }

  ngOnInit(): void {
         this.loading=true;
    this.heroService.getAllHeroes().subscribe(heroes=>{
      heroes.sort((a, b) => {
        const n = a.nombre.toLocaleLowerCase().localeCompare(b.nombre.toLocaleLowerCase());
        return n === 0 && a !== b ? b.nombre.localeCompare(a.nombre) : n;
      });
      this.dataSource.data = heroes;
      this.loading=false;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

 applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDeleteHeroe(heroe: HeroeModel) {
    Swal.fire({
      title: '¿Seguro que desea eliminar este registro?',
      text: `!No podrá revertir los cambios!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '!Sí, eliminalo!',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.value) {
        Swal.fire({
         icon: 'info',
         text:'Eliminando...',
         showConfirmButton: false,
         allowOutsideClick: false
        });
        Swal.showLoading();
        this.heroService.deleteHeroById(heroe).then(() => {
          Swal.fire('!Eliminado!', 'El registro ha sido eliminado con exito.', 'success');
        }).catch((error) => {
          Swal.fire('Error!', 'Hubo un error al eliminar el registro', 'error');
        });
      }
    });
  }

  onEditHero(hero: HeroeModel) {
    // console.log('Edit post', post);
    this.openDialog(hero);
  }

  onNewPost() {
    this.openDialog();
  }

  private openDialog(hero?: HeroeModel): void {
    const config = {
      data: {
        message: hero ? 'Editar heroe' : 'Nuevo heroe',
        content: hero
      }
    };

    const dialogRef = this.dialog.open(ModalComponent, config);
    
    dialogRef.afterClosed().subscribe(result => {
      if(!result || result===true){
        return;
      }
      console.log(`Dialog result ${result}`);
    }, (err)=>{
        console.log(`El error es: ${err}`);
    });
  }

}
