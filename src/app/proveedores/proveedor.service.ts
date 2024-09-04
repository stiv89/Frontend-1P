import { Injectable } from '@angular/core';
import { Proveedor } from './proveedor.model';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private proveedores: Proveedor[] = [];

  constructor() { }

  getProveedores(): Proveedor[] {
    return this.proveedores;
  }

  addProveedor(proveedor: Proveedor): void {
    this.proveedores.push(proveedor);
  }

  updateProveedor(proveedor: Proveedor): void {
    const index = this.proveedores.findIndex(p => p.idProveedor === proveedor.idProveedor);
    if (index !== -1) {
      this.proveedores[index] = proveedor;
    }
  }

  deleteProveedor(id: number): void {
    this.proveedores = this.proveedores.filter(p => p.idProveedor !== id);
  }
}
