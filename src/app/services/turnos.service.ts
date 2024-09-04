import { Injectable } from '@angular/core';
import { Turno } from '../models/turno.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {
  private turnosSubject = new BehaviorSubject<Turno[]>([
    {
      fecha: '2024-08-31',  // Asegúrate de que 'fecha' esté incluida
      inicioAgendamiento: '08:00',
      finAgendamiento: '08:30',
      proveedor: 'paresa',
      estado: 'completado',
      jaula: 'jaula 1',
      inicioRecepcion: '08:14',
      finRecepcion: '08:42',
      productos: [
        { nombre: 'Gaseosa', cantidad: 20 },
        { nombre: 'Fideos', cantidad: 55 },
        { nombre: 'Pollos', cantidad: 12 }
      ]
    }
    // ... otros turnos predefinidos
  ]);

  turnos$ = this.turnosSubject.asObservable();

  getTurnos(): Turno[] {
    return this.turnosSubject.value;
  }

  agregarTurno(turno: Turno): void {
    const turnosActuales = this.turnosSubject.value;
    this.turnosSubject.next([...turnosActuales, turno]);
  }
}
