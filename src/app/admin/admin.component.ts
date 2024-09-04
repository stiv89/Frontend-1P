import { Component, OnInit } from '@angular/core';
import { DataSharingService, Proveedor, Producto } from '../services/data-sharing.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  imports: [FormsModule, CommonModule],  // Importa FormsModule y CommonModule

  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  proveedores: Proveedor[] = [];
  jaulas: number[] = [];
  nuevoProveedorNombre: string = '';
  nuevaJaula!: number;
  nuevoProductoNombre: string = '';
  nuevoProductoCantidad!: number;

  constructor(private dataSharingService: DataSharingService) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.proveedores = this.dataSharingService.getProveedores();
    this.jaulas = this.dataSharingService.getJaulas();
  
    // Verifica qué datos están siendo cargados
    console.log('Proveedores cargados:', this.proveedores);
    console.log('Jaulas cargadas:', this.jaulas);
  }
  

  /*** Proveedores ***/
  addProveedor(): void {
    if (this.nuevoProveedorNombre.trim()) {
      const nuevoProveedor: Proveedor = {
        idProveedor: Date.now(), // Generar un ID único
        nombre: this.nuevoProveedorNombre.trim()
      };
      this.dataSharingService.addProveedor(nuevoProveedor);
      this.nuevoProveedorNombre = '';
      this.cargarDatos();
    }
  }

  editProveedor(proveedor: Proveedor): void {
    const nuevoNombre = prompt('Ingrese el nuevo nombre del proveedor:', proveedor.nombre);
    if (nuevoNombre !== null && nuevoNombre.trim()) {
      proveedor.nombre = nuevoNombre.trim();
      this.dataSharingService.updateProveedor(proveedor);
      this.cargarDatos();
    }
  }

  deleteProveedor(idProveedor: number): void {
    if (confirm('¿Está seguro de que desea eliminar este proveedor y sus productos asociados?')) {
      this.dataSharingService.deleteProveedor(idProveedor);
      this.cargarDatos();
    }
  }

  /*** Jaulas ***/
  addJaula(): void {
    if (this.nuevaJaula) {
      this.dataSharingService.addJaula(this.nuevaJaula);
      this.nuevaJaula = null!;
      this.cargarDatos();
    }
  }

  deleteJaula(jaulaNumber: number): void {
    if (confirm(`¿Está seguro de que desea eliminar la jaula número ${jaulaNumber}?`)) {
      this.dataSharingService.deleteJaula(jaulaNumber);
      this.cargarDatos();
    }
  }

  /*** Productos ***/
  getProductosPorProveedor(idProveedor: number): Producto[] {
    return this.dataSharingService.getProductosPorProveedor(idProveedor);
  }

  addProducto(idProveedor: number): void {
    if (this.nuevoProductoNombre.trim() && this.nuevoProductoCantidad != null) {
      const nuevoProducto: Producto = {
        idProducto: Date.now(), // Generar un ID único
        nombre: this.nuevoProductoNombre.trim(),
        cantidad: this.nuevoProductoCantidad
      };
      this.dataSharingService.addProducto(idProveedor, nuevoProducto);
      this.nuevoProductoNombre = '';
      this.nuevoProductoCantidad = null!;
      this.cargarDatos();
    }
  }

  editProducto(idProveedor: number, producto: Producto): void {
    const nuevoNombre = prompt('Ingrese el nuevo nombre del producto:', producto.nombre);
    const nuevaCantidad = prompt('Ingrese la nueva cantidad del producto:', producto.cantidad.toString());

    if (nuevoNombre !== null && nuevoNombre.trim() && nuevaCantidad !== null && !isNaN(Number(nuevaCantidad))) {
      producto.nombre = nuevoNombre.trim();
      producto.cantidad = Number(nuevaCantidad);
      this.dataSharingService.updateProducto(idProveedor, producto);
      this.cargarDatos();
    }
  }

  deleteProducto(idProveedor: number, idProducto: number): void {
    if (confirm('¿Está seguro de que desea eliminar este producto?')) {
      this.dataSharingService.deleteProducto(idProveedor, idProducto);
      this.cargarDatos();
    }
  }
}
