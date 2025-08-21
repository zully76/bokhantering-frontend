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

  // Nuevo método para obtener las citas públicas
  getPublicCitat(): Observable<Citat[]> {
    return this.http.get<Citat[]>(`${API_URL}/api/citat/public`);
  }

  // Este método podría usarse para obtener las citas del usuario (si la lógica del backend lo permite)
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

