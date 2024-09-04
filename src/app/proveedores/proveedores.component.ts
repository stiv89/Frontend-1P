import { Component, OnInit } from '@angular/core';
import { ProveedorService } from '../services/proveedor.service';
import { Proveedor } from '../models/proveedor';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {
  proveedores: Proveedor[] = [];
  proveedorForm: Proveedor = { id: 0, nombre: '', direccion: '', telefono: '', email: '' };
  editando: boolean = false;

  constructor(private proveedorService: ProveedorService) {}

  ngOnInit(): void {
    this.getProveedores();
  }

  getProveedores(): void {
    this.proveedorService.getProveedores()
      .subscribe(proveedores => this.proveedores = proveedores);
  }

  addProveedor(): void {
    if (this.editando) {
      this.proveedorService.updateProveedor(this.proveedorForm)
        .subscribe(proveedor => {
          const index = this.proveedores.findIndex(p => p.id === proveedor.id);
          this.proveedores[index] = proveedor;
          this.cancelarEdicion();
        });
    } else {
      this.proveedorService.addProveedor(this.proveedorForm)
        .subscribe(proveedor => {
          this.proveedores.push(proveedor);
          this.resetForm();
        });
    }
  }

  editarProveedor(proveedor: Proveedor): void {
    this.editando = true;
    this.proveedorForm = { ...proveedor };
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.resetForm();
  }

  resetForm(): void {
    this.proveedorForm = { id: 0, nombre: '', direccion: '', telefono: '', email: '' };
  }

  deleteProveedor(id: number): void {
    this.proveedorService.deleteProveedor(id)
      .subscribe(() => {
        this.proveedores = this.proveedores.filter(proveedor => proveedor.id !== id);
      });
  }
}


