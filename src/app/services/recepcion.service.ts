import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recepcion } from '../models/recepcion';

@Injectable({
  providedIn: 'root'
})
export class RecepcionService {
  private apiUrl = 'http://localhost:3000/recepciones';  // URL de la API

  constructor(private http: HttpClient) {}

  getRecepciones(): Observable<Recepcion[]> {
    return this.http.get<Recepcion[]>(this.apiUrl);
  }

  getRecepcion(id: number): Observable<Recepcion> {
    return this.http.get<Recepcion>(`${this.apiUrl}/${id}`);
  }

  addRecepcion(recepcion: Recepcion): Observable<Recepcion> {
    return this.http.post<Recepcion>(this.apiUrl, recepcion);
  }

  updateRecepcion(recepcion: Recepcion): Observable<Recepcion> {
    return this.http.put<Recepcion>(`${this.apiUrl}/${recepcion.id}`, recepcion);
  }

  deleteRecepcion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
