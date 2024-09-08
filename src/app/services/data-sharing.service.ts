import { Injectable } from '@angular/core';

export interface Producto {
  idProducto: number;
  nombre: string;
  cantidad: number;
}

export interface Proveedor {
  idProveedor: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private proveedores: Proveedor[] = [
    { idProveedor: 1, nombre: 'Proveedor 1' },
    { idProveedor: 2, nombre: 'Proveedor 2' },
    { idProveedor: 3, nombre: 'Proveedor 3' },
    { idProveedor: 4, nombre: 'Proveedor 4' },
    { idProveedor: 5, nombre: 'Proveedor 5' }
  ];

  private jaulas: number[] = [1, 2, 3];

  private productosPorProveedor: { [key: number]: Producto[] } = {
    1: [
      { idProducto: 1, nombre: 'Producto A', cantidad: 0 },
      { idProducto: 2, nombre: 'Producto B', cantidad: 0 }
    ],
    2: [
      { idProducto: 3, nombre: 'Producto C', cantidad: 0 },
      { idProducto: 4, nombre: 'Producto D', cantidad: 0 }
    ],
    3: [
      { idProducto: 5, nombre: 'Producto E', cantidad: 0 },
      { idProducto: 6, nombre: 'Producto F', cantidad: 0 }
    ],
    4: [
      { idProducto: 7, nombre: 'Producto G', cantidad: 0 },
      { idProducto: 8, nombre: 'Producto H', cantidad: 0 }
    ],
    5: [
      { idProducto: 9, nombre: 'Producto I', cantidad: 0 },
      { idProducto: 10, nombre: 'Producto J', cantidad: 0 }
    ]
  };

  constructor() {
    this.loadData();
  }

  private loadData(): void {
    const proveedores = localStorage.getItem('proveedores');
    const jaulas = localStorage.getItem('jaulas');
    const productosPorProveedor = localStorage.getItem('productosPorProveedor');

    if (proveedores) this.proveedores = JSON.parse(proveedores);
    if (jaulas) this.jaulas = JSON.parse(jaulas);
    if (productosPorProveedor) this.productosPorProveedor = JSON.parse(productosPorProveedor);
  }

  private saveData(): void {
    localStorage.setItem('proveedores', JSON.stringify(this.proveedores));
    localStorage.setItem('jaulas', JSON.stringify(this.jaulas));
    localStorage.setItem('productosPorProveedor', JSON.stringify(this.productosPorProveedor));
  }

  /*** Proveedores ***/
  getProveedores(): Proveedor[] {
    return [...this.proveedores];
  }

  addProveedor(proveedor: Proveedor): void {
    this.proveedores.push(proveedor);
    this.saveData();
  }

  updateProveedor(updatedProveedor: Proveedor): void {
    const index = this.proveedores.findIndex(p => p.idProveedor === updatedProveedor.idProveedor);
    if (index !== -1) {
      this.proveedores[index] = updatedProveedor;
      this.saveData();
    }
  }

  deleteProveedor(idProveedor: number): void {
    this.proveedores = this.proveedores.filter(p => p.idProveedor !== idProveedor);
    delete this.productosPorProveedor[idProveedor];
    this.saveData();
  }

  /*** Jaulas ***/
  getJaulas(): number[] {
    return [...this.jaulas];
  }

  addJaula(jaulaNumber: number): void {
    if (!this.jaulas.includes(jaulaNumber)) {
      this.jaulas.push(jaulaNumber);
      this.saveData();
    }
  }
  updateJaula(oldJaula: number, newJaula: number): void {
    const index = this.jaulas.findIndex(j => j === oldJaula);
    if (index !== -1) {
      this.jaulas[index] = newJaula;
    }
  }
  
  deleteJaula(jaulaNumber: number): void {
    this.jaulas = this.jaulas.filter(j => j !== jaulaNumber);
    this.saveData();
  }

  /*** Productos ***/
  getProductosPorProveedor(idProveedor: number): Producto[] {
    return [...(this.productosPorProveedor[idProveedor] || [])];
  }

  addProducto(idProveedor: number, producto: Producto): void {
    if (!this.productosPorProveedor[idProveedor]) {
      this.productosPorProveedor[idProveedor] = [];
    }
    this.productosPorProveedor[idProveedor].push(producto);
    this.saveData();
  }

  updateProducto(idProveedor: number, updatedProducto: Producto): void {
    const productos = this.productosPorProveedor[idProveedor];
    if (productos) {
      const index = productos.findIndex(p => p.idProducto === updatedProducto.idProducto);
      if (index !== -1) {
        productos[index] = updatedProducto;
        this.saveData();
      }
    }
  }

  deleteProducto(idProveedor: number, idProducto: number): void {
    const productos = this.productosPorProveedor[idProveedor];
    if (productos) {
      this.productosPorProveedor[idProveedor] = productos.filter(p => p.idProducto !== idProducto);
      this.saveData();
    }
  }
}
