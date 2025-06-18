// src/app/services/book.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  // Cambiar esta URL a la URL de tu API en Azure
  private apiUrl = 'https://koden-backend-app-hugqhmfkb0hugff5.swedencentral-01.azurewebsites.net/api/boks'; // Cambiar con tu URL de Azure

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Bok[]> {
    return this.http.get<Bok[]>(this.apiUrl);
  }
}

