import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { SesionService } from 'src/app/servicios/sesion/sesion.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css']
})
export class SesionComponent {
  usuario!: string;
  contrasena!: string;
  token!: any;
  credenciales: boolean = false;
  constructor(
    private sesionService: SesionService,
    private router: Router,
    public auth:AngularFireAuth) { 
      this.auth.user.subscribe(t=>
        console.info(t));
    }
  

    onSubmit() {//login con cuenta de base de dato MYSQL
      this.sesionService.validarCredencial(this.usuario, this.contrasena).subscribe(
        (res: any) => {
          this.credenciales=false;
          console.log(`Sesión creada con éxito`);
  
          // Guarda el token de sesión en localStorage
          this.token=JSON.stringify(res.token);
          localStorage.setItem('TOKEN',this.token);
          sessionStorage.setItem('TOKEN',this.token);// se guarda en sesion storage
          // se lee con:
          this.router.navigate(['/']);
        },
        (err: any) => {
          this.credenciales=true;
          console.log(`Error al iniciar sesión ${err.message}`);
        }
      );
    }
    login(){
      this.auth.signInWithPopup(new GoogleAuthProvider());
      //this.auth.signInWithPopup(new MicrosoftAuthProvider());
    }
    logout(){
      this.auth.signOut();
    }
}
