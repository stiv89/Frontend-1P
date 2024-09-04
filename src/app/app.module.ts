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
import { AdminComponent } from './admin/admin.component';  // Asegúrate de que el componente Admin esté importado

import { AppRoutingModule } from './app-routing.module';  // Importa AppRoutingModule

const routes: Routes = [
  { path: 'proveedores', component: ProveedoresComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'jaulas', component: JaulasComponent },
  { path: 'turnos-agendados', component: TurnosAgendadosComponent },
  { path: 'reserva-turnos', component: ReservaTurnosComponent },
  { path: 'admin', component: AdminComponent },  // Cargar componente directamente
  { path: '', redirectTo: '/turnos-agendados', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    ProveedoresComponent,
    ProductosComponent,
    JaulasComponent,
    TurnosAgendadosComponent,
    ReservaTurnosComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,  // FormsModule debe estar aquí para que ngModel funcione
    RouterModule.forRoot(routes),
    AppRoutingModule  // Asegúrate de agregar AppRoutingModule aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
