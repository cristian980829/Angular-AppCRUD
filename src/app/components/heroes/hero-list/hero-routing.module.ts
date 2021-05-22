import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroListComponent } from './hero-list.component';
import { AuthGuard } from 'src/app/shared/auth.guard';

const routes: Routes = [{ path: '', component: HeroListComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroListRoutingModule { }
