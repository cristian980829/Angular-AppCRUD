import { Component, OnInit, Input } from '@angular/core';
import { HeroeModel } from '../../../shared/models/heroe.model';
import { HeroesService } from '../services/heroes.service';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';

import {  MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-hero',
  templateUrl: './edit-hero.component.html',
  styleUrls: ['./edit-hero.component.css']
})
export class EditHeroComponent implements OnInit {

  @Input() hero: HeroeModel;

  image:any;
  
  constructor( private heroService:HeroesService,
    private dialogRef: MatDialogRef<EditHeroComponent>,
    private _snackBar: MatSnackBar) { 
    }
    
    ngOnInit(): void {
    }

  public editHero(hero: HeroeModel) {
        if (!this.image) {
          hero.imagen = this.hero.imagen;
            this.heroService.editHero(hero)
            .then(()=> this.endedProcess())
            .catch(err=>{
              Swal.fire({
                icon: 'error',
                title: `Error: ${err}`,
                showConfirmButton: true
              })
            });
        } 
        else {
          const DATA = this.heroService.uploadImageAndGetUrl(this.image);
          DATA.task.snapshotChanges()
          .pipe(
            finalize(() => {
              DATA.fileRef.getDownloadURL().subscribe(urlImage => {
                this.heroService.editHero(hero, urlImage)
                  .then(()=> this.endedProcess())
                   .catch(err=>{
                     Swal.fire({
                       icon: 'error',
                       title: `Error: ${err}`,
                       showConfirmButton: true
                    })
                   });
              },err=>{
                //SI HUBO ERROR AL SUBIR LA IMAGEN
                Swal.fire({
                     icon: 'error',
                     title: `Error: ${err}`,
                     showConfirmButton: true
                    })
              });
            })
          ).subscribe();
        }

  }

  private endedProcess(){
    this.dialogRef.close();
    this._snackBar.open('!Modificado con exito!', 'Cerrar', {
      duration: 4 * 1000,
    });
  }

}