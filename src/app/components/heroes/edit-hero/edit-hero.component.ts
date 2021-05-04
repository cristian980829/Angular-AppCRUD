import { Component, OnInit, Input } from '@angular/core';
import { HeroeModel } from '../../../shared/models/heroe.model';
import { HeroesService } from '../services/heroes.service';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';

import {  MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-hero',
  templateUrl: './edit-hero.component.html',
  styleUrls: ['./edit-hero.component.css']
})
export class EditHeroComponent implements OnInit {

  @Input() hero: HeroeModel;

  image:any;
  
  constructor( private heroService:HeroesService,
    public dialogRef: MatDialogRef<EditHeroComponent>) { 
    }
    
    ngOnInit(): void {
    }

  editHero(hero: HeroeModel) {
        if (!this.image) {
          hero.imagen = this.hero.imagen;
          this.heroService.saveHero(hero);          
          this.endedProcess();
        } 
        else {
          const DATA = this.heroService.uploadImageAndGetUrl(this.image);
          DATA.task.snapshotChanges()
          .pipe(
            finalize(() => {
              DATA.fileRef.getDownloadURL().subscribe(urlImage => {
              this.heroService.saveHero(hero, urlImage);
              this.endedProcess();
              });
            })
          ).subscribe();
        }

  }


  endedProcess(){
    Swal.fire({
      icon: 'success',
      title: 'Actualizado con exito',
      showConfirmButton: true
    });
    this.dialogRef.close();
  }

}