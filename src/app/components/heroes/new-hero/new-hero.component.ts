import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../services/heroes.service';
import { MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-hero',
  templateUrl: './new-hero.component.html',
  styleUrls: ['./new-hero.component.css']
})
export class NewHeroComponent implements OnInit {

  image:any;

  constructor( public heroService: HeroesService,
    private dialogRef: MatDialogRef<NewHeroComponent>,
    private _snackBar: MatSnackBar) {
  }
    
  ngOnInit(): void {
  }

    addNewHero(hero) {
      const DATA = this.heroService.uploadImageAndGetUrl(this.image);
      DATA.task.snapshotChanges()
      .pipe(
        finalize(() => {
          DATA.fileRef.getDownloadURL().subscribe( urlImage => {
                 this.heroService.saveHero(hero, urlImage)
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

  private endedProcess(){
    this.dialogRef.close();
    this._snackBar.open('!Registrado con exito!', 'Cerrar', {
      duration: 4 * 1000,
    });
  }

}
