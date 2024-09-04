export interface Recepcion {
    id: number;
    proveedorId: number;  // Relaciona Recepcion con Proveedor
    fecha: string;
    productos: string[];  // Lista de productos recibidos (podría ser un array de ids)
  }
  