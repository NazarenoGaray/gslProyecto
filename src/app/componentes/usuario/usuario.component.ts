import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, take } from 'rxjs';
import { EstadoUsuaro } from 'src/app/model/estado-usuario.model';
import { Rol } from 'src/app/model/rol.model';
import { Usuario } from 'src/app/model/usuario.model';
import { EstadoUsuariosService } from 'src/app/servicios/usuario/estado-usuarios.service';
import { RolService } from 'src/app/servicios/usuario/roles.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  idUsuario!: number;
  usuario!: Usuario;
  roles: Rol[] = [];
  estados: EstadoUsuaro[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private rolService: RolService,
    private estadoService: EstadoUsuariosService,
  ) { }
  ngOnInit(): void {
    this.route.params.pipe(
      take(1),
      switchMap(params => this.usuarioService.obtenerDetallesUsuarioPorId(params['id']))
    ).subscribe(
      (usuario: Usuario | null) => {
        if (usuario) {
          console.log("Data obtenida: ", usuario);
          this.idUsuario = usuario.idUsuario;
          this.usuario = usuario;
          console.log("Data this.obtenida: ", this.usuario);
          // Obtener el país del usuario seleccionado
        } else {
          console.log("Usuario no encontrado");
        }
      },
      error => {
        console.log(error);
      }
    );
    this.estadoService.obtenerEstadosUsuarios().subscribe(
      (res: EstadoUsuaro[]) => {
        this.estados = res;
      },
      (err: any) => {
        console.log(`Error al obtener los estados: ${err.message}`);
      }
    );
    this.rolService.obtenerRoles().subscribe(
      (res: Rol[]) => {
        this.roles = res;
      },
      (err: any) => {
        console.log(`Error al obtener los roles: ${err.message}`);
      }
    );


  }
  ////////////////////////////////////////////////////
  obtenerNombreRol(idRol: number): string {
    const rol = this.roles.find((rol) => rol.idRol === idRol);
    return rol ? rol.rol : '';
  }

  obtenerNombreEstado(idEstado: number): string {
    const estado = this.estados.find((estado) => estado.idEstadoUsuario === idEstado);
    //console.log("estados:",estado);
    return estado ? estado.estado : '';
  }
}
