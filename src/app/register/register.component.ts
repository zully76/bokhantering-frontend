import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  // Variables para el nombre de usuario, contraseña y confirmación de la contraseña
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;  // Para controlar la visibilidad de la contraseña

  // Mensajes de error y éxito
  errorMessage: string = '';
  successMessage: string = '';

  // URL del API para registro (reemplaza con tu URL real)
  private apiUrl = 'https://koden-backend-app-hugqhmfkb0hugff5.swedencentral-01.azurewebsites.net/api/auth/register'; // URL del API

  constructor(private http: HttpClient, private router: Router) { }

  // Función para alternar la visibilidad de la contraseña
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  // Función para manejar el registro de un nuevo usuario
  onRegister(): void {
    this.errorMessage = '';  // Limpiar el mensaje de error
    this.successMessage = '';  // Limpiar el mensaje de éxito

    // Validación de campos vacíos
    if (!this.username || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Alla fält måste fyllas i.';  // Mensaje de error si los campos están vacíos
      return;
    }

    // Validación de contraseñas coincidentes
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Lösenorden matchar inte.';  // Mensaje de error si las contraseñas no coinciden
      return;
    }

    // Datos del registro
    const registerData = {
      username: this.username,
      password: this.password
    };

    // Enviar la solicitud POST al backend
    this.http.post<any>(this.apiUrl, registerData).subscribe({
      next: (response) => {
        this.successMessage = 'Registrering lyckades! Du kan nu logga in.';  // Mensaje de éxito después del registro
        console.log('Registrering lyckades:', response);

        // Redirigir al login después de un corto retraso para mostrar el mensaje
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);  // 2 segundos de espera antes de redirigir
      },
      error: (error) => {
        console.error('Fel vid registrering:', error);

        // Si el backend devuelve un mensaje de error, mostrarlo
        if (error.status === 400 && error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Ett oväntat fel uppstod vid registrering. Vänligen försök igen.';  // Mensaje de error general
        }
      }
    });
  }
}

