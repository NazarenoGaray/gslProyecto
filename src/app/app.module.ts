import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; // Importar el módulo de formularios reactivos

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarClientesComponent } from './componentes/listar-clientes/listar-clientes.component';
import { NavBarComponent } from './componentes/nav-bar/nav-bar.component';
import { PiePagComponent } from './componentes/pie-pag/pie-pag.component';
import { Error404Component } from './componentes/error404/error404.component';
import { AltaClienteComponent } from './componentes/alta-cliente/alta-cliente.component';
import { ModifClienteComponent } from './componentes/modif-cliente/modif-cliente.component';
import { InicioComponent } from './componentes/inicio/inicio.component';


@NgModule({
  declarations: [
    AppComponent,
    ListarClientesComponent,
    NavBarComponent,
    PiePagComponent,
    Error404Component,
    AltaClienteComponent,
    ModifClienteComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
