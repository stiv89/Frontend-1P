import { Component, OnInit } from '@angular/core';
import { JaulaService } from '../services/jaula.service';
import { Jaula } from '../models/jaula';

@Component({
  selector: 'app-jaulas',
  templateUrl: './jaulas.component.html',
  styleUrls: ['./jaulas.component.css']
})
export class JaulasComponent implements OnInit {
  jaulas: Jaula[] = [];
  jaulaForm: Jaula = { id: 0, codigo: '', ubicacion: '', capacidad: 0 };
  editando: boolean = false;

  constructor(private jaulaService: JaulaService) {}

  ngOnInit(): void {
    this.getJaulas();
  }

  getJaulas(): void {
    this.jaulaService.getJaulas()
      .subscribe(jaulas => this.jaulas = jaulas);
  }

  addJaula(): void {
    if (this.editando) {
      this.jaulaService.updateJaula(this.jaulaForm)
        .subscribe(jaula => {
          const index = this.jaulas.findIndex(j => j.id === jaula.id);
          this.jaulas[index] = jaula;
          this.cancelarEdicion();
        });
    } else {
      this.jaulaService.addJaula(this.jaulaForm)
        .subscribe(jaula => {
          this.jaulas.push(jaula);
          this.resetForm();
        });
    }
  }

  editarJaula(jaula: Jaula): void {
    this.editando = true;
    this.jaulaForm = { ...jaula };
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.resetForm();
  }

  resetForm(): void {
    this.jaulaForm = { id: 0, codigo: '', ubicacion: '', capacidad: 0 };
  }

  deleteJaula(id: number): void {
    this.jaulaService.deleteJaula(id)
      .subscribe(() => {
        this.jaulas = this.jaulas.filter(jaula => jaula.id !== id);
      });
  }
}

