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

 private apiUrl = 'http://localhost:5050/api/boks';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Bok[]> {
    return this.http.get<Bok[]>(this.apiUrl);
  }
}

