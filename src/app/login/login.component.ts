import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  private apiUrl = 'http://localhost:5050/api/auth/login';

  constructor(private http: HttpClient, private router: Router) { }

  onLogin(): void {
    console.log('--- onLogin() HAR KALLATS ---');

    this.errorMessage = '';

    const loginData = {
      username: this.username,
      password: this.password
    };

    this.http.post<any>(this.apiUrl, loginData).subscribe({
      next: (response) => {
        const token = response.token;
        localStorage.setItem('token', token);

        try {
          const decodedToken: any = jwtDecode(token);
          const loggedInUsername = decodedToken.unique_name || 'Användare'; // Viktigt: använder 'unique_name' från token
          localStorage.setItem('loggedInUsername', loggedInUsername);
          console.log('Användarnamn från token:', loggedInUsername);
        } catch (error) {
          console.error('Fel vid avkodning av JWT-token:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('loggedInUsername');
          this.errorMessage = 'Ett fel uppstod vid inloggning. Försök igen.';
          return;
        }

        console.log('Login lyckades! Token:', token);

        this.router.navigate(['/boks']);
      },
      error: (error) => {
        console.error('Login misslyckades:', error);
        if (error.status === 401) {
          this.errorMessage = 'Fel användarnamn eller lösenord.';
        } else {
          this.errorMessage = 'Ett oväntat fel uppstod. Vänligen försök igen.';
        }
      }
    });
  }

  onLogout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUsername');
    this.router.navigate(['/login']);
  }
}

