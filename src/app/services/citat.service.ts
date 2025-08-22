import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Citat } from '../models/citat.model';

const API_URL = 'https://koden-backend-app-hugqhmfkb0hugff5.swedencentral-01.azurewebsites.net';

@Injectable({
  providedIn: 'root'
})
export class CitatService {

  constructor(private http: HttpClient) { }

  // Nuevo método para obtener las citas públicas
  getPublicCitat(): Observable<Citat[]> {
    return this.http.get<Citat[]>(`${API_URL}/api/citat/public`);
  }

  // Este método podría usarse para obtener las citas del usuario
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


