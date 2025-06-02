// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Behövs för att navigera

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bokhantering-frontend';
  isDarkTheme: boolean = false;


  constructor(private router: Router) { }

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('themePreference');
    if (savedTheme === 'dark'){

    }else{
      this.isDarkTheme = false;
      document.body.classList.remove('dark-theme');
    }

  }
    onLogoutClick(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    console.log('Du har loggat ut från App-komponenten.');
  }
    toggleTheme(): void {
      this.isDarkTheme = !this.isDarkTheme;
      if (this.isDarkTheme){
        document.body.classList.add('dark-theme');
        localStorage.setItem('themePreference', 'dark');

      }else{
        document.body.classList.remove('dark-theme');
        localStorage.setItem('themePreference', 'Light');
      }
    }


}


