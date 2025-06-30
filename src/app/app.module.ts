// src/app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BoksComponent } from './boks/boks.component';
import { AddBokComponent } from './add-bok/add-bok.component';
import { EditBokComponent } from './edit-bok/edit-bok.component';
import { CitatComponent } from './citat/citat.component';
import { RegisterComponent } from './register/register.component';

import { authInterceptor } from './auth-interceptor/auth.interceptor'; // Importera interceptor

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BoksComponent,
    AddBokComponent,
    EditBokComponent,
    CitatComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule
  ],
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])) // Lägg till interceptorn här
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
