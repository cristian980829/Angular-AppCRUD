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
          import('./components/pages/pages.module').then(m => m.PagesModule)
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./components/users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'heroList',
        loadChildren: () =>
          import('./components/heroes/hero-list/hero-list.module').then(m => m.HeroListModule)
      },
      { path: 'hero/:id', component: HeroComponent },
      {
        path: '**',
        redirectTo: 'home/home',
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
