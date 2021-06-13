import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';




// const routes: Routes = [{ path: '', component: AboutComponent }];

const routes: Routes = [{ path: '', children: [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: 'home/home' }
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class PagesRoutingModule { }
