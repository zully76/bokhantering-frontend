// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from './login/login.component';
import { BoksComponent} from './boks/boks.component';
import { AddBokComponent} from './add-bok/add-bok.component';
import { EditBokComponent } from './edit-bok/edit-bok.component';
import { CitatComponent } from './citat/citat.component';
import { RegisterComponent}from './register/register.component';
import { authGuard} from './auth.guard'; // Importera authGuard

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'boks',
    component: BoksComponent,
    canActivate: [authGuard] // Skyddar rutt med guard
  },
  {
    path: 'add-bok',
    component: AddBokComponent,
    canActivate: [authGuard] // Skyddar rutt med guard
  },
  {
    path: 'edit-bok/:id',
    component: EditBokComponent,
    canActivate: [authGuard] // Skyddar rutt med guard
  },
  {
    path: 'citat',
    component: CitatComponent,
    canActivate: [authGuard] // Skyddar rutt med guard
  },
  { path: '', redirectTo: '/login', pathMatch: 'full'} // Standardomdirigering
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
