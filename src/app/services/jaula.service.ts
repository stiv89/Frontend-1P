import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Jaula } from '../models/jaula';

@Injectable({
  providedIn: 'root'
})
export class JaulaService {
  private apiUrl = 'http://localhost:3000/jaulas';  // URL de la API

  constructor(private http: HttpClient) {}

  getJaulas(): Observable<Jaula[]> {
    return this.http.get<Jaula[]>(this.apiUrl);
  }

  getJaula(id: number): Observable<Jaula> {
    return this.http.get<Jaula>(`${this.apiUrl}/${id}`);
  }

  addJaula(jaula: Jaula): Observable<Jaula> {
    return this.http.post<Jaula>(this.apiUrl, jaula);
  }

  updateJaula(jaula: Jaula): Observable<Jaula> {
    return this.http.put<Jaula>(`${this.apiUrl}/${jaula.id}`, jaula);
  }

  deleteJaula(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
