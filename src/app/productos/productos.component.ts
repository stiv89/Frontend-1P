import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  productoForm: Producto = { id: 0, nombre: '', descripcion: '', precio: 0, proveedorId: 0 };
  editando: boolean = false;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(): void {
    this.productoService.getProductos()
      .subscribe(productos => this.productos = productos);
  }

  addProducto(): void {
    if (this.editando) {
      this.productoService.updateProducto(this.productoForm)
        .subscribe(producto => {
          const index = this.productos.findIndex(p => p.id === producto.id);
          this.productos[index] = producto;
          this.cancelarEdicion();
        });
    } else {
      this.productoService.addProducto(this.productoForm)
        .subscribe(producto => {
          this.productos.push(producto);
          this.resetForm();
        });
    }
  }

  editarProducto(producto: Producto): void {
    this.editando = true;
    this.productoForm = { ...producto };
  }

  cancelarEdicion(): void {
    this.editando = false;
    this.resetForm();
  }

  resetForm(): void {
    this.productoForm = { id: 0, nombre: '', descripcion: '', precio: 0, proveedorId: 0 };
  }

  deleteProducto(id: number): void {
    this.productoService.deleteProducto(id)
      .subscribe(() => {
        this.productos = this.productos.filter(producto => producto.id !== id);
      });
  }
}

