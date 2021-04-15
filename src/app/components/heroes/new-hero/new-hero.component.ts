import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { HeroesService } from '../services/heroes.service';
import { HeroeModel } from '../../../shared/models/heroe.model';
import { MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-hero',
  templateUrl: './new-hero.component.html',
  styleUrls: ['./new-hero.component.css']
})
export class NewHeroComponent implements OnInit {

  imagen:any;
  loading:boolean=false;
  url: Observable<string>;

  constructor( private heroService: HeroesService,
                      public dialogRef: MatDialogRef<NewHeroComponent>,
                      private fb:FormBuilder) { }           

  
  get poderes(){
    return this.newHeroForm.get('poderes') as FormArray;
  }
  
  public newHeroForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required),
    universo: new FormControl('', Validators.required),
    heroImage: new FormControl('', Validators.required),
    poderes: this.fb.array([])
  });

  ngOnInit(): void {
  }

  agregarPoderes(){
    this.poderes.push( this.fb.control('') );
  }

  borrarPoderes(i:number){
    this.poderes.removeAt(i);
  }

  addNewHero(data: HeroeModel) {
      this.loading=true;
      const DATA = this.heroService.uploadImageAndGetUrl(this.imagen);
      DATA.task.snapshotChanges()
      .pipe(
        finalize(() => {
          DATA.fileRef.getDownloadURL().subscribe(urlImage => {
            this.heroService.saveHero(data, urlImage);
            this.loading=false;
            this.dialogRef.close();
            Swal.fire({
             icon: 'success',
             title: 'Registrado exitosamente',
             showConfirmButton: true
            })
          });
        })
      ).subscribe();
  }

  handleImage(event: any): void {
    this.imagen = event.target.files[0];
  }

}
