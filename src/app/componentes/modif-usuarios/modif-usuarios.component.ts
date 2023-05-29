import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, take } from 'rxjs';
import { EstadoUsuaro } from 'src/app/model/estado-usuario.model';
import { Rol } from 'src/app/model/rol.model';
import { Usuario } from 'src/app/model/usuario.model';
import { EstadoUsuariosService } from 'src/app/servicios/usuario/estado-usuarios.service';
import { RolService } from 'src/app/servicios/usuario/roles.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';

@Component({
  selector: 'app-modif-usuarios',
  templateUrl: './modif-usuarios.component.html',
  styleUrls: ['./modif-usuarios.component.css']
})
export class ModifUsuariosComponent {

  usuarioForm!: FormGroup;
  usuario!: Usuario;
  id_usuario!: number;
  roles: Rol[] = [];
  estados: EstadoUsuaro[] = [];
  paises: any[] = [];
  provincias: any[] = [];
  localidades: any[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private rolService: RolService,
    private estadoService: EstadoUsuariosService,
  ) { }

  ngOnInit(): void {
    this.usuarioForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email, this.validateCorreo]],
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
      id_rol: ['', Validators.required],
      id_estado_usuario: ['', Validators.required]
    });
    // Obtenemos los roles para cargarlos en el select
    this.rolService.obtenerRoles().subscribe(
      (res: Rol[]) => {
        this.roles = res;
      },
      (err: any) => {
        console.log(`Error al obtener los roles: ${err.message}`);
      }
    );
    ///////////////////////////////////////////////
    this.estadoService.obtenerEstadosUsuarios().subscribe(
      (res: EstadoUsuaro[]) => {
        this.estados = res;
      },
      (err: any) => {
        console.log(`Error al obtener los estados: ${err.message}`);
      }
    );
    ////////////////////////////////////////////////////////
    this.route.params.pipe(
      take(1),
      switchMap(params => this.usuarioService.obtenerUsuarioPorId(params['id']))
    ).subscribe(
      (usuario: Usuario | null) => {
        if (usuario) {
          console.log("Data obtenida: ", usuario);
          this.usuarioForm.patchValue(usuario);
          this.id_usuario = usuario.id_usuario;
          this.usuario = usuario;
        } else {
          console.log("Usuario no encontrado");
        }
      },
      error => {
        console.log(error);
      }
    );

  }
  validateCorreo(control: AbstractControl): { [key: string]: any } | null {
    if (control.value && control.value.length < 5) {
      return { 'correoInvalido': true };
    }
    return null;
  }
  actualizarUsuario() {
    const usuarioFormulario = this.usuarioForm.value;
    this.usuario = {
      ...usuarioFormulario,
      id_usuario: this.id_usuario
    };
    this.usuarioService.actualizarUsuario(this.id_usuario, this.usuario).subscribe(
      (res: any) => {
        console.log(`Usuario con ID ${this.id_usuario} actualizado`);
        this.router.navigate(['/listar-usuarios']);
      },
      (err: any) => {
        console.log(`Error al actualizar usuario: ${err.message}`);
      }
    );
  }

}
