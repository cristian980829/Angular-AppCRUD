import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
// import { HttpClientModule } from '@angular/common/http';

//firestore modules
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';

import { MaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContainerAppComponent } from './components/pages/container-app/container-app.component';
import { EditHeroComponent } from './components/heroes/edit-hero/edit-hero.component';
import { HeroListComponent } from './components/heroes/hero-list/hero-list.component';
import { NewHeroComponent } from './components/heroes/new-hero/new-hero.component';
import { HeroComponent } from './components/heroes/hero/hero.component';
import { TableComponent } from './shared/components/table/table.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';


@NgModule({
  declarations: [
    AppComponent,
    ContainerAppComponent,
    EditHeroComponent,
    HeroListComponent,
    NewHeroComponent,
    HeroComponent,
    TableComponent,
    ModalComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    // HttpClientModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule
  ],
  providers: [ {provide: BUCKET, useValue:'gs://appcrudv2.appspot.com' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
