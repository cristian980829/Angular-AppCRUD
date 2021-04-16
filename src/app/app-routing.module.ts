import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerAppComponent } from './components/pages/container-app/container-app.component';
import { HeroComponent } from './components/heroes/hero/hero.component';

const routes: Routes = [
   {
    path: '',
    component: ContainerAppComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./components/pages/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./components/pages/about/about.module').then(
            m => m.AboutModule
          )
      },
      {
        path: 'heroList',
        loadChildren: () =>
          import('./components/heroes/hero-list/hero-list.module').then(m => m.HeroListModule)
      },
      { path: 'hero/:id', component: HeroComponent },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
