import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Bok {
  id: number;
  title: string;
  author: string;
  publicationDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class BokService {

  // URL för API:en i Azure
  private apiUrl = 'https://koden-backend-app-hugqhmfkb0hugff5.swedencentral-01.azurewebsites.net/api/boks';

  constructor(private http: HttpClient) { }

  // Hämtar böcker från API:en
  getBooks(): Observable<Bok[]> {
    const token = localStorage.getItem('jwtToken');  // Hämta token från localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);  // Lägg till token i headers
    return this.http.get<Bok[]>(this.apiUrl, { headers });  // Skicka GET-förfrågan till API:en med token
  }
}

