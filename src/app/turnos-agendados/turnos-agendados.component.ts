import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../services/data-sharing.service';

interface Producto {
  idProducto: number;
  nombre: string;
  cantidad: number;
}

interface Proveedor {
  idProveedor: number;
  nombre: string;
}

interface Turno {
  fecha: string;
  inicioAgendamiento: string;
  finAgendamiento: string;
  proveedor: string;
  estado: string;
  jaula: string | null;
  inicioRecepcion: string | null;
  finRecepcion: string | null;
  productos: Producto[];
}

@Component({
  selector: 'app-turnos-agendados',
  templateUrl: './turnos-agendados.component.html',
  styleUrls: ['./turnos-agendados.component.css']
})
export class TurnosAgendadosComponent implements OnInit {
  selectedProveedor: string = '';
  selectedProducto: string = '';
  selectedJaula: string = '';
  selectedDate: string = '';
  turnos: Turno[] = [
    {
      fecha: '2024-08-31',
      inicioAgendamiento: '08:00',
      finAgendamiento: '08:30',
      proveedor: 'Proveedor 1',
      estado: 'completado',
      jaula: '1',
      inicioRecepcion: '08:14',
      finRecepcion: '08:42',
      productos: [
        { idProducto: 1, nombre: 'Producto A', cantidad: 20 },
        { idProducto: 2, nombre: 'Producto B', cantidad: 55 }
      ]
    },
    {
      fecha: '2024-08-31',
      inicioAgendamiento: '09:00',
      finAgendamiento: '10:00',
      proveedor: 'Proveedor 2',
      estado: 'pendiente',
      jaula: null,
      inicioRecepcion: null,
      finRecepcion: null,
      productos: [
        { idProducto: 3, nombre: 'Producto C', cantidad: 30 },
        { idProducto: 4, nombre: 'Producto D', cantidad: 45 }
      ]
    },
    {
      fecha: '2023-08-31',
      inicioAgendamiento: '09:00',
      finAgendamiento: '09:30',
      proveedor: 'Proveedor 3',
      estado: 'en recepcion',
      jaula: '2',
      inicioRecepcion: '09:03',
      finRecepcion: null,
      productos: [
        { idProducto: 5, nombre: 'Producto E', cantidad: 20 },
        { idProducto: 6, nombre: 'Producto F', cantidad: 55 }
      ]
    },
    {
      fecha: '2023-08-31',
      inicioAgendamiento: '10:00',
      finAgendamiento: '11:00',
      proveedor: 'Proveedor 4',
      estado: 'pendiente',
      jaula: null,
      inicioRecepcion: null,
      finRecepcion: null,
      productos: [
        { idProducto: 7, nombre: 'Producto G', cantidad: 25 },
        { idProducto: 8, nombre: 'Producto H', cantidad: 30 }
      ]
    },
    {
      fecha: '2023-08-31',
      inicioAgendamiento: '11:00',
      finAgendamiento: '12:00',
      proveedor: 'Proveedor 5',
      estado: 'completado',
      jaula: '3',
      inicioRecepcion: '11:15',
      finRecepcion: '11:50',
      productos: [
        { idProducto: 9, nombre: 'Producto I', cantidad: 10 },
        { idProducto: 10, nombre: 'Producto J', cantidad: 25 }
      ]
    }



    ];
  filteredTurnos: Turno[] = [];

  proveedores: Proveedor[] = [];
  productosDisponibles: Producto[] = [];
  jaulasDisponibles: number[] = [];

  showJaulaPopup: boolean = false;
  showDetallesPopup: boolean = false;
  turnoSeleccionado: Turno | null = null;

  constructor(private dataSharingService: DataSharingService) {}

  ngOnInit(): void {
    // Obtener listas desde el servicio
    this.proveedores = this.dataSharingService.getProveedores();
    this.jaulasDisponibles = this.dataSharingService.getJaulas();
  
    // Cargar los turnos desde el almacenamiento local (si existen)
    const turnosGuardados = JSON.parse(localStorage.getItem('turnosAgendados') || '[]');
  
    // Combinar los turnos predeterminados con los turnos guardados
    this.turnos = turnosGuardados.length > 0 ? [...this.turnos, ...turnosGuardados] : this.turnos;
  
    // Filtrar los turnos (si tienes alguna lógica de filtrado)
    this.filteredTurnos = [...this.turnos];
  
    // Actualizar la lista de productos disponibles basado en el proveedor seleccionado
    this.actualizarProductosDisponibles();
  }

  actualizarProductosDisponibles(): void {
    const proveedorSeleccionado = this.proveedores.find(p => p.nombre === this.selectedProveedor);
    if (proveedorSeleccionado) {
      this.productosDisponibles = this.dataSharingService.getProductosPorProveedor(proveedorSeleccionado.idProveedor);
    } else {
      this.productosDisponibles = [];
    }
  }

  filtrar(): void {
    this.filteredTurnos = this.turnos.filter(turno => {
      return (
        (!this.selectedDate || turno.fecha === this.selectedDate) &&
        (!this.selectedProveedor || turno.proveedor === this.selectedProveedor) &&
        (!this.selectedProducto || turno.productos.some(producto => producto.nombre === this.selectedProducto)) &&
        (!this.selectedJaula || turno.jaula === this.selectedJaula)
      );
    });
  }

  abrirReservaTurnos(): void {
    window.open('http://localhost:4200/reserva-turnos', '_blank');
  }

  abrirJaulaPopup(turno: Turno): void {
    this.turnoSeleccionado = turno;
    this.showJaulaPopup = true;
  }

  cerrarJaulaPopup(): void {
    this.showJaulaPopup = false;
  }

  seleccionarJaula(jaula: string): void {
    if (this.turnoSeleccionado) {
      this.turnoSeleccionado.jaula = jaula;
      this.turnoSeleccionado.estado = 'en recepcion';
      this.turnoSeleccionado.inicioRecepcion = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      this.cerrarJaulaPopup();
    }
  }

  finalizarRecepcion(turno: Turno): void {
    turno.estado = 'completado';
    turno.finRecepcion = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  verDetalles(turno: Turno): void {
    this.turnoSeleccionado = turno;
    this.showDetallesPopup = true;
  }

  cerrarDetallesPopup(): void {
    this.showDetallesPopup = false;
  }
  irAAdmin(): void {
    window.open('http://localhost:4200/admin', '_blank');
  }

}
