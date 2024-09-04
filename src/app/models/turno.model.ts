export interface Turno {
  fecha: string;  // Añadido para incluir la fecha
  inicioAgendamiento: string;
  finAgendamiento: string;
  proveedor: string;
  estado: string;
  jaula: string | null;
  inicioRecepcion: string | null;
  finRecepcion: string | null;
  productos: Producto[];  // Aquí se define la lista de productos
}

export interface Producto {
  nombre: string;
  cantidad: number;
}
