import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Bok {
  id: number;
  title: string;
  author: string;
  publicationDate: string;
}

@Component({
  selector: 'app-edit-bok',
  templateUrl: './edit-bok.component.html',
  styleUrls: ['./edit-bok.component.css']
})
export class EditBokComponent implements OnInit {
  bok: Bok = {
    id: 0,
    title: '',
    author: '',
    publicationDate: ''
  };

  errorMessage: string = '';
  loading: boolean = false;
  private apiUrl = 'http://localhost:5050/api/Boks';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = parseInt(idParam, 10);
      if (!isNaN(id)) {
        this.fetchBok(id);
      } else {
        this.errorMessage = 'Ogiltigt bok-ID.';
      }
    } else {
      this.errorMessage = 'Bok-ID saknas.';
    }
  }

  fetchBok(id: number): void {
    this.loading = true;
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<Bok>(`${this.apiUrl}/${id}`, { headers }).subscribe({
      next: (data) => {
        this.bok = data;
        this.loading = false;

        if (this.bok.publicationDate && this.bok.publicationDate.includes('T')) {
          this.bok.publicationDate = this.bok.publicationDate.split('T')[0];
        }
      },
      error: (error) => {
        this.errorMessage = 'Kunde inte hämta boken.';
        this.loading = false;
        console.error('Fel vid hämtning av bok:', error);
      }
    });
  }

  onSave(): void {
    this.loading = true;
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });


    this.http.put(`${this.apiUrl}/${this.bok.id}`, this.bok, { headers }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/boks']);
      },
      error: (error) => {
        this.errorMessage = 'Kunde inte uppdatera boken.';
        this.loading = false;
        console.error('Fel vid uppdatering av bok:', error);

        if (error.status === 401 || error.status === 403) {
            this.errorMessage = 'Din session har gått ut eller är ogiltig. Vänligen logga in igen.';
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
        } else if (error.status === 400) {
            this.errorMessage = 'Felaktiga data. Kontrollera inmatningen.';
        } else if (error.status === 404) {
            this.errorMessage = 'Boken hittades inte på servern.';
        }
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/boks']);
  }
}
