import { Injectable } from '@angular/core';
import { map} from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { HeroeModel } from 'src/app/shared/models/heroe.model';
import { FileI } from 'src/app/shared/models/file.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

private heroesCollection: AngularFirestoreCollection<HeroeModel>;
private filePath: any;

  constructor( private afs: AngularFirestore,
                      private storage: AngularFireStorage ) {
                        
    this.heroesCollection = afs.collection<HeroeModel>('heroes');    
  }

    public getAllHeroes(): Observable<HeroeModel[]> {
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

  public getHero(id:string): Observable<HeroeModel> {
    return this.afs.doc<HeroeModel>(`heroes/${id}`).valueChanges();
  }
  
  public saveHero(hero:HeroeModel,urlImage?:any):Promise<DocumentReference<HeroeModel>>{
    return this.heroesCollection.add(this.createHero(hero,urlImage));
  }

  public editHero( hero:HeroeModel,urlImage?:any ):Promise<any>{
    if(!urlImage){
      return this.heroesCollection.doc(hero.id).update(hero);
    }
    return this.heroesCollection.doc(hero.id).update(this.createHero(hero,urlImage));
  }

  private createHero(hero:HeroeModel,urlImage:any){
    const heroeObj = {
      nombre: hero.nombre,
      poderes: hero.poderes,
      estado: hero.estado,
      universo: hero.universo,
      imagen: urlImage,
      fileRef: this.filePath,
      valoracion: hero.valoracion
    };
    return heroeObj;
  }
  
  public uploadImageAndGetUrl(image: FileI) {
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    const DATA = {
      fileRef,
      task
    }
    return DATA;
  }
  
  public deleteHeroById(heroe: HeroeModel):Promise<any> {
    return this.heroesCollection.doc(heroe.id).delete();
  }

}
