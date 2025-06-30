// src/app/app.component.ts

import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'bokhantering-frontend';
  isDarkTheme: boolean = false;
  loggedInUsername: string | null = null;
  isLoginPage: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('themePreference');
    if (savedTheme === 'dark') {
      this.isDarkTheme = true;
      document.body.classList.add('dark-theme');
    } else {
      this.isDarkTheme = false;
      document.body.classList.remove('dark-theme');
    }

    this.checkLoggedInUser();
    this.isLoginPage = this.router.url === '/login';

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkLoggedInUser();
      this.isLoginPage = this.router.url === '/login';
    });
  }

  checkLoggedInUser(): void {
    const username = localStorage.getItem('loggedInUsername');
    if (username) {
      this.loggedInUsername = username;
    } else {
      this.loggedInUsername = null;
    }
  }

  onLogoutClick(): void {
    localStorage.removeItem('jwtToken'); // Rensa token
    localStorage.removeItem('loggedInUsername'); // Rensa användarnamn
    this.loggedInUsername = null;
    this.router.navigate(['/login']);
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    if (this.isDarkTheme) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('themePreference', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('themePreference', 'Light');
    }
  }
}

