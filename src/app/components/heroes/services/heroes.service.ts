import { Injectable } from '@angular/core';
import { map, delay } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { HeroeModel } from 'src/app/shared/models/heroe.model';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

private heroesCollection: AngularFirestoreCollection<HeroeModel>;

  constructor( private afs: AngularFirestore 
                        ) {
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
      poderes: ['volar','comer'],
      estado: heroe.estado,
      universo: heroe.universo
    };
    return this.heroesCollection.add(heroetObj);
  }

  //Se crea un objeto temporal sin el id para que al guardarlo en firebase no se cree el atributo id, y se mantiene el objeto original para obtener el id del que se actualizará
  editHero( heroe:HeroeModel ){
    const HEROETEMP = {
      ...heroe,
      poderes: ['Saltar','Kaioken']
    }

    delete HEROETEMP.id;
    return this.heroesCollection.doc(heroe.id).update(HEROETEMP);
    // return this.http.put(`${this.url}/heroes/${heroe.id}.json`,HEROETEMP);
  }

}
