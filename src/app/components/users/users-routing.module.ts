import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from 'src/app/shared/auth.guard';

const routes: Routes = [{ path: '', children: [
  { path: 'login', component: LoginComponent  },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class UsersRoutingModule { }
