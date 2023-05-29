import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, take, tap, throwError } from 'rxjs';
import { Usuario } from 'src/app/model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
// URL de la API
apiURL = 'http://localhost/GaryStorageLogistic/ApiUsuarios.php';

// Lista de usuarios
usuarios = [];

// Usuario seleccionado (si lo hay)
usuarioSeleccionado = null;

// Constructor del componente
constructor(private http: HttpClient) { }
getDatos() {
  return this.http.get(`${this.apiURL}/datos`);
}
// Función para obtener todos los usuarios
obtenerUsuarios(): Observable<Usuario[]> {
  return this.http.get(this.apiURL).pipe(
    map((data: any) => {
      return data.map((usuario: any) => new Usuario(
        usuario.id_usuario,
        usuario.nombre,
        usuario.apellido,
        usuario.telefono,
        usuario.correo,
        usuario.usuario,
        usuario.contrasena,
        usuario.id_rol,
        usuario.id_estado_usuario
      ));
    })
  );
}


// Función para obtener un usuario por su ID
obtenerUsuarioPorId(id_usuario: number) {
  return this.http.get(`${this.apiURL}?id_usuario=${id_usuario}`).pipe(
    take(1),
    tap((data: any) => {
      this.usuarioSeleccionado = data;
    }),
    catchError(err => {
      console.log(`Error al obtener usuario por ID: ${err.message}`);
      return throwError(err);
    })
  );
}


// Función para crear un nuevo usuario
crearUsuario(usuario: Usuario) {
  console.log('Datos del usuario:', usuario);
  return this.http.post(this.apiURL, usuario).pipe(
    tap((data: any) => console.log(`Usuario creado con ID ${data.id_usuario}`)),
    catchError(err => {
      console.log(`Err4or al crear usuario: ${err.message}`);
      return throwError(err);
    })
  );
}



// Función para actualizar un usuario por su ID
actualizarUsuario(id_usuario: number, usuario: Usuario): Observable<any> {
  return this.http.put(`${this.apiURL}?id_usuario=${id_usuario}`, usuario).pipe(
    catchError(err => {
      console.log(`Error al actualizar usuario: ${err.message}`);
      return throwError(err);
    })
  );
}


// Función para eliminar un usuario por su ID
eliminarUsuario(id_usuario: number): Observable<any> {
  return this.http.delete(`${this.apiURL}?id_usuario=${id_usuario}`).pipe(
    tap(() => console.log(`Usuario con ID ${id_usuario} eliminado`)),
    catchError(error => {
      console.error(error);
      return of(null);
    })
  );
}

}





