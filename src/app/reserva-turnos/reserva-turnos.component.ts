import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../services/data-sharing.service';
import { Router } from '@angular/router';  // Importa Router para la redirección

interface Producto {
  idProducto: number;
  nombre: string;
  cantidad: number;
}

@Component({
  selector: 'app-reserva-turnos',
  templateUrl: './reserva-turnos.component.html',
  styleUrls: ['./reserva-turnos.component.css']
})
export class ReservaTurnosComponent implements OnInit {

  reservaForm = {
    fecha: '',
    horaInicioAgendamiento: '',
    horaFinAgendamiento: '',
    idProveedor: 1,
    idJaula: 1
  };

  horas: string[] = [
    '07:00', '07:30', '08:00', '08:30', 
    '09:00', '09:30', '10:00', '10:30', 
    '11:00', '11:30', '12:00', '12:30', 
    '13:00', '13:30', '14:00', '14:30', 
    '15:00', '15:30', '16:00', '16:30', 
    '17:00', '17:30', '18:00'
  ];
  
  proveedores: any[] = [];  // Inicializar vacío
  jaulas: number[] = [];
  productosDisponibles: Producto[] = [];
  productosSeleccionados: Producto[] = [];

  constructor(private dataSharingService: DataSharingService, private router: Router) {}  // Inyectar el router

  ngOnInit(): void {
    // Inicializa las listas desde el servicio dentro de ngOnInit
    this.proveedores = this.dataSharingService.getProveedores();
    this.jaulas = this.dataSharingService.getJaulas();
    this.actualizarProductosDisponibles();
  }

  actualizarProductosDisponibles(): void {
    const proveedorId = this.reservaForm.idProveedor;
    this.productosDisponibles = this.dataSharingService.getProductosPorProveedor(proveedorId);
  }

  incrementarCantidad(idProducto: number): void {
    const producto = this.productosDisponibles.find(p => p.idProducto === idProducto);
    if (producto) {
      producto.cantidad++;
      this.actualizarProductosSeleccionados(idProducto, producto.cantidad);
    }
  }

  decrementarCantidad(idProducto: number): void {
    const producto = this.productosDisponibles.find(p => p.idProducto === idProducto);
    if (producto && producto.cantidad > 0) {
      producto.cantidad--;
      this.actualizarProductosSeleccionados(idProducto, producto.cantidad);
    }
  }

  actualizarProductosSeleccionados(idProducto: number, cantidad: number): void {
    const productoSeleccionado = this.productosSeleccionados.find(p => p.idProducto === idProducto);
    if (productoSeleccionado) {
      if (cantidad > 0) {
        productoSeleccionado.cantidad = cantidad;
      } else {
        this.productosSeleccionados = this.productosSeleccionados.filter(p => p.idProducto !== idProducto);
      }
    } else if (cantidad > 0) {
      const producto = this.productosDisponibles.find(p => p.idProducto === idProducto);
      if (producto) {
        this.productosSeleccionados.push({ ...producto });
      }
    }
  }

  registrarTurno(): void {
    const existingTurnos = JSON.parse(localStorage.getItem('turnosAgendados') || '[]');
    const proveedorSeleccionado = this.proveedores.find(p => p.idProveedor == this.reservaForm.idProveedor);

    const newTurno = {
      fecha: this.reservaForm.fecha,
      inicioAgendamiento: this.reservaForm.horaInicioAgendamiento,
      finAgendamiento: this.reservaForm.horaFinAgendamiento,
      proveedor: proveedorSeleccionado ? proveedorSeleccionado.nombre : 'Proveedor desconocido',
      jaula: this.reservaForm.idJaula || 'Sin jaula',
      estado: 'pendiente',
      inicioRecepcion: null,
      finRecepcion: null,
      productos: this.productosSeleccionados
    };

    existingTurnos.push(newTurno);
    localStorage.setItem('turnosAgendados', JSON.stringify(existingTurnos));
    console.log('Turno registrado y guardado en localStorage:', newTurno);

    // Redirigir a la página de turnos agendados
    this.router.navigate(['turnos-agendados']);
  }

  volverATurnosAgendados(): void {
    this.router.navigate(['turnos-agendados']);
  }
  
}
