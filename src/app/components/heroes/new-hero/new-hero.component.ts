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
    public dialogRef: MatDialogRef<NewHeroComponent>) {
  }
    
    ngOnInit(): void {
    }

  addNewHero(hero) {
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

  endedProcess(){
    Swal.fire({
      icon: 'success',
      title: 'Registrado con exito',
      showConfirmButton: true
    });
    this.dialogRef.close();
  }

}
