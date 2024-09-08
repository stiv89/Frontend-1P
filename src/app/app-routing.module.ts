import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ProductosComponent } from './productos/productos.component';
import { JaulasComponent } from './jaulas/jaulas.component';
import { TurnosAgendadosComponent } from './turnos-agendados/turnos-agendados.component';
import { ReservaTurnosComponent } from './reserva-turnos/reserva-turnos.component';  // Importa el nuevo componente
import { AdminComponent } from './admin/admin.component';  // Importa el componente Admin
import { LoginComponent } from './auth/login/login.component';  // Importa el componente de Login


const routes: Routes = [
  { path: 'login', component: LoginComponent },  // Ruta para el Login
  { path: 'proveedores', component: ProveedoresComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'jaulas', component: JaulasComponent },
  { path: 'turnos-agendados', component: TurnosAgendadosComponent },
  { path: 'reserva-turnos', component: ReservaTurnosComponent },
  { path: 'admin', component: AdminComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Cambiar la ruta por defecto a login
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
