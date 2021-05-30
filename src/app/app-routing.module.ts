import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerAppComponent } from './components/pages/container-app/container-app.component';
import { HeroComponent } from './components/heroes/hero/hero.component';
import { AuthGuard } from './shared/auth.guard';

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
        path: 'user/login',
        loadChildren: () =>
          import('./components/users/login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'user/register',
        loadChildren: () =>
          import('./components/users/register/register.module').then(m => m.RegisterModule)
      },
      {
        path: 'user/profile',
        loadChildren: () =>
          import('./components/users/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'heroList',
        loadChildren: () =>
          import('./components/heroes/hero-list/hero-list.module').then(m => m.HeroListModule)
      },
      { path: 'hero/:id', component: HeroComponent },
      {
        path: '**',
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
