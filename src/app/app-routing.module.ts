import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ProductosComponent } from './productos/productos.component';
import { JaulasComponent } from './jaulas/jaulas.component';
import { TurnosAgendadosComponent } from './turnos-agendados/turnos-agendados.component';
import { ReservaTurnosComponent } from './reserva-turnos/reserva-turnos.component';  // Importa el nuevo componente
import { AdminComponent } from './admin/admin.component';  // Importa el componente Admin


const routes: Routes = [
  { path: 'proveedores', component: ProveedoresComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'jaulas', component: JaulasComponent },
  { path: 'turnos-agendados', component: TurnosAgendadosComponent },
  { path: 'reserva-turnos', component: ReservaTurnosComponent },  // Ruta independiente
  { path: 'admin', component: AdminComponent },
  { path: '', redirectTo: '/turnos-agendados', pathMatch: 'full' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
