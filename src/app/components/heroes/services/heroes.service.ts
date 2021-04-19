import { Injectable } from '@angular/core';
import { map, delay, finalize, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { HeroeModel } from 'src/app/shared/models/heroe.model';
import { FileI } from 'src/app/shared/models/file.model';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

public loading=false;
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

  getHero(id:string): Observable<HeroeModel>{
    return this.afs.doc<HeroeModel>(`heroes/${id}`).valueChanges();
  }

  getOneHero(id:string): Observable<HeroeModel> {
    return this.afs.doc<HeroeModel>(`heroes/${id}`).valueChanges();
  }
  
    saveHero( hero:HeroeModel,urlImage?:any ){
      if(!urlImage){
        return this.heroesCollection.doc(hero.id).update(hero);
      }

     const heroetObj = {
      nombre: hero.nombre,
      poderes: hero.poderes,
      estado: hero.estado,
      universo: hero.universo,
      imagen: urlImage,
      fileRef: this.filePath,
      valoracion: hero.valoracion
    };

    if (hero.id) {
      return this.heroesCollection.doc(hero.id).update(heroetObj);
    } else {
      return this.heroesCollection.add(heroetObj);
    }
  }
  
    uploadImageAndGetUrl(image: FileI) {
      this.filePath = `images/${image.name}`;
      const fileRef = this.storage.ref(this.filePath);
      const task = this.storage.upload(this.filePath, image);
      const DATA = {
        fileRef,
        task
      }
      return DATA;
    }
  
  deleteHeroById(heroe: HeroeModel) {
    return this.heroesCollection.doc(heroe.id).delete();
  }

}
