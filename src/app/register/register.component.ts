import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  // Variabler för användarnamn, lösenord och bekräftelse av lösenord
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;  // För att hantera visibilitet av lösenord

  // Felmeddelande och framgångsmeddelande
  errorMessage: string = '';
  successMessage: string = '';

  // API URL för registrering
  private apiUrl = 'https://koden-backend-app-hugqhmfkb0hugff5.swedencentral-01.azurewebsites.net/api/auth/register'; // URL till Azure API

  constructor(private http: HttpClient, private router: Router) { }

  // Funktion för att växla lösenordsvisning
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  // Funktion för registrering
  onRegister(): void {
    this.errorMessage = '';  // Rensa tidigare felmeddelande
    this.successMessage = '';  // Rensa tidigare framgångsmeddelande

    // Kontrollera att alla fält är ifyllda
    if (!this.username || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Alla fält måste fyllas i.'; // Felmeddelande om fält är tomma
      return;
    }

    // Kontrollera att lösenorden matchar
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Lösenorden matchar inte.'; // Felmeddelande om lösenorden inte stämmer
      return;
    }

    // Förbereda data för registrering
    const registerData = {
      username: this.username,
      password: this.password
    };

    // Skicka POST-förfrågan till backend för registrering
    this.http.post<any>(this.apiUrl, registerData).subscribe({
      next: (response) => {
        this.successMessage = 'Registrering lyckades! Du kan nu logga in.'; // Frånregistreringsmeddelande på svenska
        console.log('Registrering lyckades:', response);

        // Om registreringen lyckas, omdirigera användaren till login-sidan
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Fel vid registrering:', error);

        // Om det finns ett felmeddelande från backend, visa det
        if (error.status === 400 && error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Ett oväntat fel uppstod vid registrering. Vänligen försök igen.'; // Generellt felmeddelande
        }
      }
    });
  }
}

