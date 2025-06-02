import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BoksComponent } from './boks/boks.component';
import { AddBokComponent } from './add-bok/add-bok.component';
import { EditBokComponent } from './edit-bok/edit-bok.component';
import { CitatComponent } from './citat/citat.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BoksComponent,
    AddBokComponent,
    EditBokComponent,
    CitatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
