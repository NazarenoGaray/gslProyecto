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
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { YoComponent } from './componentes/yo/yo.component';
import { FiltroPipe } from './pipes/filtro.pipe';
import { FiltroClientesPipe } from './pipes/filtro-clientes.pipe';
import { ChatComponent } from './componentes/chat/chat.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { GraficoComponent } from './componentes/grafico/grafico.component';






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
    UsuarioComponent,
    YoComponent,
    FiltroPipe,
    FiltroClientesPipe,
    ChatComponent,
    GraficoComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
