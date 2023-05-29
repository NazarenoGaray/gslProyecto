import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SesionService } from 'src/app/servicios/sesion/sesion.service';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css']
})
export class SesionComponent {
  usuario!: string;
  contrasena!: string;
  token!: any;
  constructor(
    private sesionService: SesionService,
    private router: Router) { }
  
    onSubmit() {

      this.sesionService.validarCredencial(this.usuario, this.contrasena).subscribe(
        (res: any) => {
          console.log(`Sesión creada con éxito`);
  
          // Guarda el token de sesión en localStorage
          this.token=JSON.stringify(res.token);
          localStorage.setItem('TOKEN',this.token);
          sessionStorage.setItem('TOKEN',this.token);// se guarda en sesion storage
          // se lee con:
          this.router.navigate(['/bienvenido2']);
        },
        (err: any) => {
          console.log(`Error al iniciar sesión ${err.message}`);
        }
      );
    }
}
