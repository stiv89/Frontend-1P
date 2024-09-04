export interface Reserva {
    id: number;
    jaulaId: number;  // Relaciona Reserva con Jaula
    proveedorId: number;  // Relaciona Reserva con Proveedor
    fecha: string;
    estado: string;
  }
  