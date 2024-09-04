import { Routes } from '@angular/router';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ProductosComponent } from './productos/productos.component';
import { JaulasComponent } from './jaulas/jaulas.component';

export const routes: Routes = [
  { path: 'proveedores', component: ProveedoresComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'jaulas', component: JaulasComponent },
  { path: '', redirectTo: '/proveedores', pathMatch: 'full' },
  { path: '**', redirectTo: '/proveedores' }
];


