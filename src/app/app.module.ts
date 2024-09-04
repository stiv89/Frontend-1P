import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // Asegúrate de importar FormsModule
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ProductosComponent } from './productos/productos.component';
import { JaulasComponent } from './jaulas/jaulas.component';
import { TurnosAgendadosComponent } from './turnos-agendados/turnos-agendados.component';
import { ReservaTurnosComponent } from './reserva-turnos/reserva-turnos.component';

const routes: Routes = [
  { path: 'proveedores', component: ProveedoresComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'jaulas', component: JaulasComponent },
  { path: 'turnos-agendados', component: TurnosAgendadosComponent },
  { path: 'reserva-turnos', component: ReservaTurnosComponent },
  { path: 'admin', loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent) },  // Cargar componente standalone,
  { path: '', redirectTo: '/turnos-agendados', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    ProveedoresComponent,
    ProductosComponent,
    JaulasComponent,
    TurnosAgendadosComponent,
    ReservaTurnosComponent  // Asegúrate de que tu componente esté declarado aquí
  ],
  imports: [
    BrowserModule,
    FormsModule,  // FormsModule debe estar aquí para que ngModel funcione
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
