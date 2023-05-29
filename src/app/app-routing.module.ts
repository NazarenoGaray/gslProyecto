import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaClienteComponent } from './componentes/alta-cliente/alta-cliente.component';
import { ListarClientesComponent } from './componentes/listar-clientes/listar-clientes.component';
import { ModifClienteComponent } from './componentes/modif-cliente/modif-cliente.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { Error404Component } from './componentes/error404/error404.component';
import { SesionComponent } from './componentes/sesion/sesion.component';
import { ClienteComponent } from './componentes/cliente/cliente.component';
import { ListarUsuariosComponent } from './componentes/listar-usuarios/listar-usuarios.component';
import { AltaUsuariosComponent } from './componentes/alta-usuarios/alta-usuarios.component';

const routes: Routes = [
  { path: '',component: InicioComponent},
  { path: 'sesion',component: SesionComponent},
  { path: 'alta-cliente',component: AltaClienteComponent},
  { path: 'modificar-cliente',component: ModifClienteComponent},
  { path: 'listar-usuarios',component: ListarUsuariosComponent},
  { path: 'alta-usuario',component: AltaUsuariosComponent},
  { path: 'listar-clientes',component: ListarClientesComponent},
  { path: 'alta-cliente',component: AltaClienteComponent},
  { path: 'cliente/:id',component: ClienteComponent},
  { path: '**',component: Error404Component},
  //{ path: '',component:},
  //{ path: '',component:},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
