import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  //apiUrl = 'http://localhost/GSLogistic/Sesion.php';
  apiUrl = 'http://localhost/ApiGSL/iniciar-sesion';

  constructor(private http: HttpClient) { }

  validarCredencial(usuario: string, contrasena: string) {
    const body = {
      usuario: usuario,
      contrasena: contrasena
    };
  
    return this.http.post(this.apiUrl, body).pipe(
      tap((data: any) => {
        console.log("Inicio de sesión exitoso", data);
        const token = data.token; // Accede al token devuelto por el servidor
        // Almacena el token en localStorage o en el estado de la aplicación para su uso posterior
      }),
      catchError(err => {
        console.log("Error al iniciar sesión", err);
        return throwError(err);
      })
    );
  }

}
function throwError(err: any): any {
  throw new Error('Function not implemented.');
}

