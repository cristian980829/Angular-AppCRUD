import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../services/heroes.service';
import { MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-hero',
  templateUrl: './new-hero.component.html',
  styleUrls: ['./new-hero.component.css']
})
export class NewHeroComponent implements OnInit {

  image:any;

  constructor( public heroService: HeroesService,
    private dialogRef: MatDialogRef<NewHeroComponent>) {
  }
    
  ngOnInit(): void {
  }

  public addNewHero(hero) {
      const DATA = this.heroService.uploadImageAndGetUrl(this.image);
      DATA.task.snapshotChanges()
      .pipe(
        finalize(() => {
          DATA.fileRef.getDownloadURL().subscribe(urlImage => {
            new Promise((resolve,reject)=>{
                this.heroService.saveHero(hero, urlImage).then(()=>resolve(
                  this.endedProcess()),
                  err => reject(
                    //SI HUBO ERROR AL GUARDAR EL REGISTRO
                    Swal.fire({
                     icon: 'error',
                     title: `Error: ${err}`,
                     showConfirmButton: true
                    })
                  )
                );
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

  private endedProcess(){
    Swal.fire({
      icon: 'success',
      title: 'Registrado con exito',
      showConfirmButton: true
    });
    this.dialogRef.close();
  }

}
