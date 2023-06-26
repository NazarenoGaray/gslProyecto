import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EstadoUsuaro } from 'src/app/clases/estado-usuario.model';
import { Rol } from 'src/app/clases/rol';
import { Usuario } from 'src/app/clases/usuario';
import { TokenService } from 'src/app/servicios/token/token.service';
import { EstadoUsuariosService } from 'src/app/servicios/usuario/estado-usuarios.service';
import { RolService } from 'src/app/servicios/usuario/roles.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent {

  usuarios: Usuario[] = [];
  roles: Rol[] = [];
  estados: EstadoUsuaro[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private tokenService: TokenService,
    private rolesService: RolService,
    private estadoUsuarios: EstadoUsuariosService
  ) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
    this.obtenerRoles();
    this.obtenerEstados();
  }

  obtenerUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe(
      (response) => {
        this.usuarios = Object.values(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  obtenerRoles() {
    this.rolesService.obtenerRoles().subscribe(
      (roles: any[]) => {
        this.roles = roles;
      },
      (error) => {
        console.log('Error al obtener roles:', error);
      }
    );
  }

  obtenerEstados() {
    this.estadoUsuarios.obtenerEstadosUsuarios().subscribe(
      (estados: any[]) => {
        this.estados = estados;
      },
      (error) => {
        console.log('Error al obtener estados:', error);
      }
    );
  }

  obtenerNombreRol(idRol: number): string {
    const rol = this.roles.find((rol) => rol.idRol === idRol);
    return rol ? rol.rol : '';
  }

  obtenerNombreEstado(idEstado: number): string {
    const estado = this.estados.find((estado) => estado.idEstadoUsuario === idEstado);
    //console.log("estados:",estado);
    return estado ? estado.estado : '';
  }

  detallesUsuario(idUsuario: number) {
    this.router.navigate(['/usuario',idUsuario]);
  }
}
