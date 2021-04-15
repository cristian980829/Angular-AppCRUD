import { Injectable } from '@angular/core';
import { map, delay, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { HeroeModel } from 'src/app/shared/models/heroe.model';
import { FileI } from 'src/app/shared/models/file.model';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

private heroesCollection: AngularFirestoreCollection<HeroeModel>;
private filePath: any;
private downloadURL: Observable<string>;

  constructor( private afs: AngularFirestore,
                      private storage: AngularFireStorage ) {
                        
    this.heroesCollection = afs.collection<HeroeModel>('heroes');    
  }

    getAllHeroes(): Observable<HeroeModel[]> {
    return this.heroesCollection
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as HeroeModel;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  deleteHeroById(heroe: HeroeModel) {
    return this.heroesCollection.doc(heroe.id).delete();
  }

  getHero(id:string): Observable<HeroeModel>{
    return this.afs.doc<HeroeModel>(`heroes/${id}`).valueChanges();
    
  }



  saveHero( heroe:HeroeModel ){
     const heroetObj = {
      nombre: heroe.nombre,
      poderes: heroe.poderes,
      estado: heroe.estado,
      universo: heroe.universo,
      imagen: this.downloadURL,
      fileRef: this.filePath,
    };
    return this.heroesCollection.add(heroetObj);
  }

  //Se crea un objeto temporal sin el id para que al guardarlo en firebase no se cree el atributo id, y se mantiene el objeto original para obtener el id del que se actualizará
  editHero( heroe:HeroeModel ){
    const HEROETEMP = {
      ...heroe
    }

    delete HEROETEMP.id;
    return this.heroesCollection.doc(heroe.id).update(HEROETEMP);
  }

  getOneHero(hero: HeroeModel): Observable<HeroeModel> {
    const id= hero.id;
    return this.afs.doc<HeroeModel>(`heroes/${id}`).valueChanges();
  }

  preAddAndUpdateHero(hero: HeroeModel, image: FileI): void {
    this.uploadImage(hero, image);
  }

  private uploadImage(hero: HeroeModel, image: FileI) {
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            this.downloadURL = urlImage;
            this.saveHero(hero);
          });
        })
      ).subscribe();
  }

}
