import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, take } from 'rxjs';
import { EstadoUsuaro } from 'src/app/clases/estado-usuario.model';
import { Rol } from 'src/app/clases/rol';
import { Usuario } from 'src/app/clases/usuario';
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
  //roles: Rol[] = [];
  //estados: EstadoUsuaro[] = [];
  idRol!:number;
  idEstado!:number;
  rol!: Rol;
  estado!: EstadoUsuaro;
  apellido!:string;

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
          this.usuario = usuario;
          this.idRol = usuario.idRol;
          this.idEstado = usuario.idEstadoUsuario;
  
          console.log("Usuario obtenido: ", this.usuario);
  
          this.estadoService.obtenerEstadoUsuarioPorId(this.idEstado).subscribe(
            (res: EstadoUsuaro) => {
              this.estado = res;
            },
            (err: any) => {
              console.log(`Error al obtener los estados: ${err.message}`);
            }
          );
          this.rolService.obtenerRolPorId(this.idRol).subscribe(
            (res: Rol) => {
              this.rol = res;
              console.log("rol:",res)
            },
            (err: any) => {
              console.log(`Error al obtener los roles: ${err.message}`);
            }
          );
        } else {
          console.log("Usuario no encontrado");
        }
      },
      error => {
        console.log('Error al obtener usuario:', error);
      }
    );
  }
  
  ////////////////////////////////////////////////////
  // obtenerNombreRol(idRol: number): string {
  //   const rol = this.roles.find((rol) => rol.idRol === idRol);
  //   return rol ? rol.rol : '';
  // }

  // obtenerNombreEstado(idEstado: number): string {
  //   const estado = this.estados.find((estado) => estado.idEstadoUsuario === idEstado);
  //   //console.log("estados:",estado);
  //   return estado ? estado.estado : '';
  // }
}
