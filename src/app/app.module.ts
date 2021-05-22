import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//firestore modules
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';


import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ContainerAppComponent } from './components/pages/container-app/container-app.component';

import { HeroesModule } from './components/heroes/heroes.module';
import { ComponentsModule } from './shared/components/components.module';
import { ModalComponent } from './shared/components/modal/modal.component';
import { MaterialModule } from './material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    ContainerAppComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    HeroesModule,
    ComponentsModule,
    MaterialModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [ {provide: BUCKET, useValue:'gs://appcrudv2.appspot.com' }, AngularFireAuth ],
  bootstrap: [AppComponent]
})
export class AppModule { }
