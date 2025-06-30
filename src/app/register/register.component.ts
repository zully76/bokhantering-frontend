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
  showPassword: boolean = false;


  errorMessage: string = '';
  successMessage: string = '';


  private apiUrl = 'https://koden-backend-app-hugqhmfkb0hugff5.swedencentral-01.azurewebsites.net/api/auth/register'; // URL del API

  constructor(private http: HttpClient, private router: Router) { }


  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }


  onRegister(): void {
    this.errorMessage = '';
    this.successMessage = '';


    if (!this.username || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Alla fält måste fyllas i.';
    }


    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Lösenorden matchar inte.';
    }


    const registerData = {
      username: this.username,
      password: this.password
    };


    this.http.post<any>(this.apiUrl, registerData).subscribe({
      next: (response) => {
        this.successMessage = 'Registrering lyckades! Du kan nu logga in.';
        console.log('Registrering lyckades:', response);


        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
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
