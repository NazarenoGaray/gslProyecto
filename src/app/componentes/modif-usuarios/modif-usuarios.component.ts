import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, take } from 'rxjs';
import { EstadoUsuaro } from 'src/app/clases/estado-usuario.model';
import { Rol } from 'src/app/clases/rol';
import { Usuario } from 'src/app/clases/usuario';
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
  usuarioOriginal!: Usuario;
  idUsuario!: number;
  roles: Rol[] = [];
  estados: EstadoUsuaro[] = [];
  paises: any[] = [];
  provincias: any[] = [];
  localidades: any[] = [];
  hayCambios: boolean = false;

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
      idUsuario: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email, this.validateCorreo]],
      usuario: ['', Validators.required],
      contraseña: ['', Validators.required],
      idRol: ['', Validators.required],
      idEstadoUsuario: ['', Validators.required]
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
    )
    .subscribe(
      (usuario: Usuario | null) => {
        if (usuario) {
          console.log("Data obtenida: ", usuario);
          this.usuarioForm.patchValue(usuario);
          this.idUsuario = usuario.idUsuario;
          this.usuario = usuario;
          this.usuarioOriginal = usuario;
          console.log('usuario:', usuario);
          console.log('formularioActual:', JSON.stringify(this.usuarioForm.value));
          console.log('usuarioOriginal:', JSON.stringify(this.usuarioOriginal));
          this.usuarioForm.valueChanges.subscribe(() => {
            this.detectarCambios();
          });
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
    this.detectarCambios();
    const usuarioFormulario = this.usuarioForm.value;
    this.usuario = {
      ...usuarioFormulario,
      usuario: this.idUsuario
    };
    this.usuarioService.actualizarUsuario(this.usuario).subscribe(
      (res: any) => {
        console.log(`Usuario con ID ${this.idUsuario} actualizado`);
        this.router.navigate(['/listar-usuarios']);
      },
      (err: any) => {
        console.log(`Error al actualizar usuario: ${err.message}`);
      }
    );
    
    this.hayCambios = false;
  }
  detectarCambios(): void {
    this.hayCambios = !this.sonDatosIguales();
  }
  sonDatosIguales(): boolean {
    // Obtener los valores actuales del formulario
    const formularioActual = this.usuarioForm.value;
    console.log('formularioActual:', JSON.stringify(this.usuarioForm.value));
    console.log('usuarioOriginal:', JSON.stringify(this.usuarioOriginal));
    console.log('const formularioActual:', JSON.stringify(formularioActual));
    // Comparar los valores actuales con los valores originales
    return JSON.stringify(formularioActual) === JSON.stringify(this.usuarioOriginal);
  }
}
