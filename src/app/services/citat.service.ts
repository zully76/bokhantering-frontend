import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://koden-backend-app-hugqhmfkb0hugff5.swedencentral-01.azurewebsites.net';

interface Citat {
  id?: number;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class CitatService {

  constructor(private http: HttpClient) { }

  getCitat(): Observable<Citat[]> {
    return this.http.get<Citat[]>(`${API_URL}/api/citat`);
  }

  addCitat(citat: { text: string }): Observable<Citat> {
    return this.http.post<Citat>(`${API_URL}/api/citat`, citat);
  }

  deleteCitat(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/api/citat/${id}`);
  }
}


