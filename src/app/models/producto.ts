export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    proveedorId: number;  // Relaciona Producto con Proveedor
  }
  