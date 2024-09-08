import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Importa el Router
import { DataSharingService, Proveedor, Producto } from '../services/data-sharing.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  proveedores: Proveedor[] = [];
  jaulas: number[] = [];
  nuevoProveedorNombre: string = '';
  nuevaJaula!: number;
  nuevoProductoNombre: string = '';
  nuevoProductoCantidad!: number;

  // Controlar la visibilidad de los modales
  showModalProveedores = false;
  showModalJaulas = false;

  proveedorSeleccionado: Proveedor | null = null;  // Proveedor seleccionado para editar
  productosSeleccionados: Producto[] = [];  // Productos del proveedor seleccionado

  constructor(private dataSharingService: DataSharingService, private router: Router) {}  // Inyecta el Router

  ngOnInit(): void {
    this.cargarDatos();
  }

  openModal(modal: string): void {
    if (modal === 'proveedores') {
      this.showModalProveedores = true;
    } else if (modal === 'jaulas') {
      this.showModalJaulas = true;
    }
  }

  closeModal(modal: string): void {
    if (modal === 'proveedores') {
      this.showModalProveedores = false;
      this.proveedorSeleccionado = null;
      this.productosSeleccionados = [];
    } else if (modal === 'jaulas') {
      this.showModalJaulas = false;
    }
  }

  cargarDatos(): void {
    this.proveedores = this.dataSharingService.getProveedores();
    this.jaulas = this.dataSharingService.getJaulas();
  
    console.log('Proveedores cargados:', this.proveedores);
    console.log('Jaulas cargadas:', this.jaulas);
  }
  
  /*** Proveedores ***/
  addProveedor(): void {
    if (this.nuevoProveedorNombre.trim()) {
      const nuevoProveedor: Proveedor = {
        idProveedor: Date.now(),
        nombre: this.nuevoProveedorNombre.trim()
      };
      this.dataSharingService.addProveedor(nuevoProveedor);
      this.nuevoProveedorNombre = '';
      this.cargarDatos();
    }
  }

  selectProveedor(proveedor: Proveedor): void {
    this.proveedorSeleccionado = proveedor;
    this.productosSeleccionados = this.dataSharingService.getProductosPorProveedor(proveedor.idProveedor);
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

  /*** Productos ***/
  getProductosPorProveedor(idProveedor: number): Producto[] {
    return this.dataSharingService.getProductosPorProveedor(idProveedor);
  }

  addProducto(idProveedor: number): void {
    if (this.nuevoProductoNombre.trim() && this.nuevoProductoCantidad != null) {
      const nuevoProducto: Producto = {
        idProducto: Date.now(),
        nombre: this.nuevoProductoNombre.trim(),
        cantidad: this.nuevoProductoCantidad
      };
      this.dataSharingService.addProducto(idProveedor, nuevoProducto);
      this.nuevoProductoNombre = '';
      this.nuevoProductoCantidad = null!;
      this.selectProveedor(this.proveedorSeleccionado!);  // Refrescar los productos del proveedor
    }
  }

  editProducto(idProveedor: number, producto: Producto): void {
    const nuevoNombre = prompt('Ingrese el nuevo nombre del producto:', producto.nombre);
    const nuevaCantidad = prompt('Ingrese la nueva cantidad del producto:', producto.cantidad.toString());

    if (nuevoNombre !== null && nuevoNombre.trim() && nuevaCantidad !== null && !isNaN(Number(nuevaCantidad))) {
      producto.nombre = nuevoNombre.trim();
      producto.cantidad = Number(nuevaCantidad);
      this.dataSharingService.updateProducto(idProveedor, producto);
      this.selectProveedor(this.proveedorSeleccionado!);  // Refrescar los productos del proveedor
    }
  }

  deleteProducto(idProveedor: number, idProducto: number): void {
    if (confirm('¿Está seguro de que desea eliminar este producto?')) {
      this.dataSharingService.deleteProducto(idProveedor, idProducto);
      this.selectProveedor(this.proveedorSeleccionado!);  // Refrescar los productos del proveedor
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
  editJaula(jaulaNumber: number): void {
    const nuevoNumero = prompt('Ingrese el nuevo número de jaula:', jaulaNumber.toString());
    
    if (nuevoNumero !== null && !isNaN(Number(nuevoNumero)) && Number(nuevoNumero) > 0) {
      this.dataSharingService.updateJaula(jaulaNumber, Number(nuevoNumero));
      this.cargarDatos(); // Refrescar la lista de jaulas
    }
  }
  deleteJaula(jaulaNumber: number): void {
    if (confirm(`¿Está seguro de que desea eliminar la jaula número ${jaulaNumber}?`)) {
      this.dataSharingService.deleteJaula(jaulaNumber);
      this.cargarDatos();
    }
  }

  volverATurnosAgendados(): void {
    this.router.navigate(['turnos-agendados']);  // Redirigir a la página de turnos agendados
  }


}
