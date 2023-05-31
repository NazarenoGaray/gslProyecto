import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importar el módulo de formularios reactivos

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarClientesComponent } from './componentes/listar-clientes/listar-clientes.component';
import { NavBarComponent } from './componentes/nav-bar/nav-bar.component';
import { PiePagComponent } from './componentes/pie-pag/pie-pag.component';
import { Error404Component } from './componentes/error404/error404.component';
import { AltaClienteComponent } from './componentes/alta-cliente/alta-cliente.component';
import { ModifClienteComponent } from './componentes/modif-cliente/modif-cliente.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { AltaUsuariosComponent } from './componentes/alta-usuarios/alta-usuarios.component';
import { ListarUsuariosComponent } from './componentes/listar-usuarios/listar-usuarios.component';
import { ModifUsuariosComponent } from './componentes/modif-usuarios/modif-usuarios.component';
import { SesionComponent } from './componentes/sesion/sesion.component';
import { ClienteComponent } from './componentes/cliente/cliente.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { NosotrosComponent } from './componentes/nosotros/nosotros.component';



@NgModule({
  declarations: [
    AppComponent,
    ListarClientesComponent,
    NavBarComponent,
    PiePagComponent,
    Error404Component,
    AltaClienteComponent,
    ModifClienteComponent,
    InicioComponent,
    AltaUsuariosComponent,
    ListarUsuariosComponent,
    ModifUsuariosComponent,
    SesionComponent,
    ClienteComponent,
    ContactoComponent,
    NosotrosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
