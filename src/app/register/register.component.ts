// src/app/register/register.component.ts
// Denna komponent hanterar logiken för att registrera nya användare.
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  username: string = '';
  password: string = '';
  confirmPassword: string = '';


  errorMessage: string = '';
  successMessage: string = '';

  private apiUrl = 'http://localhost:5050/api/auth/register';


  constructor(private http: HttpClient, private router: Router) { }


  onRegister(): void {

    this.errorMessage = '';
    this.successMessage = '';

    if (!this.username || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Alla fält måste fyllas i.';
      return;
    }

    // 2. Kontrollera att lösenordet och bekräftelsen matchar.
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Lösenorden matchar inte.';
      return;
    }

    const registerData = {
      username: this.username,
      password: this.password
    };

    this.http.post<any>(this.apiUrl, registerData).subscribe({
      next: (response) => {

        this.successMessage = response.message || 'Registrering lyckades! Du kan nu logga in.';
        console.log('Registrering lyckades:', response);

        this.router.navigate(['/login']);
      },
      error: (error) => {

        console.error('Fel vid registrering:', error);

        if (error.status === 400 && error.error && error.error.message) {

          this.errorMessage = error.error.message;
        } else {

          this.errorMessage = 'Ett oväntat fel uppstod vid registrering. Vänligen försök igen.';
        }
      }
    });
  }
}


