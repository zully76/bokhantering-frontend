import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from './login/login.component';
import { BoksComponent} from './boks/boks.component';
import { AddBokComponent} from './add-bok/add-bok.component';
import { EditBokComponent } from './edit-bok/edit-bok.component';
import { CitatComponent } from './citat/citat.component';
import { RegisterComponent}from './register/register.component';
import { authGuard} from './auth.guard';
const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'boks', component: BoksComponent},
  {path: 'add-bok', component: AddBokComponent },
  { path: 'edit-bok/:id', component: EditBokComponent },
  {path: 'citat',
     component: CitatComponent,
    canActivate: [authGuard]},

  { path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
