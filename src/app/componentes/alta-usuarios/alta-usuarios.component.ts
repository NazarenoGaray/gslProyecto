import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EstadoUsuaro } from 'src/app/model/estado-usuario.model';
import { Rol } from 'src/app/model/rol.model';
import { Usuario } from 'src/app/model/usuario.model';
import { EstadoUsuariosService } from 'src/app/servicios/usuario/estado-usuarios.service';
import { RolService } from 'src/app/servicios/usuario/roles.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';

@Component({
  selector: 'app-alta-usuarios',
  templateUrl: './alta-usuarios.component.html',
  styleUrls: ['./alta-usuarios.component.css']
})
export class AltaUsuariosComponent {
  usuarioForm!: FormGroup;
  usuario!: Usuario;
  roles: Rol[] = [];
  estados: EstadoUsuaro[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private estadoService: EstadoUsuariosService,
    private router: Router
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
 //////////////////////////////////////////////////////////////////////////
 this.rolService.obtenerRoles().subscribe(
  (res: Rol[]) => {
    this.roles = res;
  },
  (err: any) => {
    console.log(`Error al obtener los roles: ${err.message}`);
  }
);
//////////////////////////////////////////////////////////////////////////
this.estadoService.obtenerEstadosUsuarios().subscribe(
  (res: EstadoUsuaro[]) => {
    this.estados = res;
  },
  (err: any) => {
    console.log(`Error al obtener los estados: ${err.message}`);
  }
);
////////////////////////////////////////////////////////////////////////


}
validateCorreo(control: AbstractControl): { [key: string]: any } | null {
  if (control.value && control.value.length < 5) {
    return { correoInvalido: true };
  }
  return null;
}

onSubmit(): void {
  if (this.usuarioForm.invalid) {
    return;
  }
  this.usuario = this.usuarioForm.value;
    this.usuarioService.crearUsuario(this.usuario).subscribe(
      (res: any) => {
        console.log('Usuario agregado exitosamente');
        this.router.navigate(['/listar-usuarios']);
      },
      (err: any) => {
        console.log(`Error al agregar el usuario: ${err.message}`);
      }
    );
  }
}
