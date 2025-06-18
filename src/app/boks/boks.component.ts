import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

interface Bok {
  id: number;
  title: string;
  author: string;
  publicationDate: string;
}

@Component({
  selector: 'app-boks',
  templateUrl: './boks.component.html',
  styleUrls: ['./boks.component.css']
})
export class BoksComponent implements OnInit {
  boks: Bok[] = [];
  errorMessage: string = '';
  loading: boolean = false;

  private apiUrl = 'https://koden-backend-app-hugqhmfkb0hugff5.swedencentral-01.azurewebsites.net/api/Boks'; // URL till Azure API

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.fetchBoks();
  }

  fetchBoks(): void {
    this.loading = true;
    this.errorMessage = '';

    const token = localStorage.getItem('jwtToken'); // Hämta token

    if (!token) {
      this.errorMessage = 'Du är inte inloggad. Vänligen logga in.';
      this.loading = false;
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<Bok[]>(this.apiUrl, { headers }).subscribe({
      next: (data) => {
        this.boks = data.map(book => {
          if (book.publicationDate) {
            const date = new Date(book.publicationDate);

            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');

            const formattedDate = `${year}-${month}-${day}`;
            return { ...book, publicationDate: formattedDate };
          }
          return book;
        });

        this.loading = false;
        console.log('Böcker laddade:', this.boks);
      },
      error: (error) => {
        this.loading = false;
        console.error('Kunde inte ladda böcker:', error);
        if (error.status === 401 || error.status === 403) {
          this.errorMessage = 'Din session har gått ut eller är ogiltig. Vänligen logga in igen.';
          localStorage.removeItem('jwtToken');
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'Kunde inte ladda böcker. Ett oväntat fel uppstod.';
        }
      }
    });
  }

  onLogout(): void {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login']);
    console.log('Du har loggat ut.');
  }

  onEditBok(id: number): void {
    this.router.navigate(['/edit-bok', id]);
  }

  onDeleteBok(id: number): void {
    if (!confirm('Är du säker på att du vill radera den här boken?')) {
      return;
    }

    const token = localStorage.getItem('jwtToken');
    if (!token) {
      this.errorMessage = 'Du är inte inloggad. Vänligen logga in.';
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.delete(`${this.apiUrl}/${id}`, { headers }).subscribe({
      next: () => {
        this.boks = this.boks.filter(bok => bok.id !== id);
        console.log('Boken raderades.');
      },
      error: (error) => {
        this.errorMessage = 'Kunde inte radera boken.';
        console.error('Fel vid radering:', error);
      }
    });
  }
}

