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
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { TokenGuard } from './guard/token.guard';
import { ModifUsuariosComponent } from './componentes/modif-usuarios/modif-usuarios.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { YoComponent } from './componentes/yo/yo.component';
import { ChatComponent } from './componentes/chat/chat.component';
import { NosotrosComponent } from './componentes/nosotros/nosotros.component';


const routes: Routes = [
  { path: '',component: InicioComponent},
  { path: 'listar-usuarios',component: ListarUsuariosComponent, canActivate:[TokenGuard]},
  { path: 'usuario/:id',component: UsuarioComponent, canActivate:[TokenGuard]},
  { path: 'alta-usuario',component: AltaUsuariosComponent, canActivate:[TokenGuard]},
  { path: 'modificar-usuario/:id',component: ModifUsuariosComponent, canActivate:[TokenGuard]},
  { path: 'alta-cliente',component: AltaClienteComponent, canActivate:[TokenGuard]},
  { path: 'modificar-cliente',component: ModifClienteComponent, canActivate:[TokenGuard]},
  { path: 'listar-clientes',component: ListarClientesComponent, canActivate:[TokenGuard]},
  { path: 'alta-cliente',component: AltaClienteComponent, canActivate:[TokenGuard]},
  { path: 'cliente/:id',component: ClienteComponent, canActivate:[TokenGuard]},
  { path: 'chat',component: ChatComponent},
  { path: 'github-creador',component: YoComponent,},
  { path: 'sesion',component: SesionComponent},
  { path: 'contacto',component: ContactoComponent},
  { path: 'nosotros',component: NosotrosComponent},
  { path: '**',component: Error404Component},
  //{ path: '',component:},
  //{ path: '',component:},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
