import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, take, tap, throwError } from 'rxjs';
import { Usuario } from 'src/app/clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // URL de la API apiURL = 'http://localhost/GSLogistic/Usuarios.php';
  //apiURL = 'http://localhost/ApiGSL';
  apiURL = 'http://localhost:3001/usuarios'

  // Lista de usuarios
  usuario!: Usuario;
  // Lista de usuarios
  usuarios!: Usuario[];
  // Usuario seleccionado (si lo hay)
  usuarioSeleccionado = null;

  // Constructor del componente
  constructor(private http: HttpClient) { }
  // getDatos() {
  //   return this.http.get(`${this.apiURL}/datos`);
  // }
  // Función para obtener todos los usuarios
  obtenerUsuarios(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiURL}`);
  }

  // Función para obtener un usuario por su ID
  obtenerUsuarioPorId(idUsuario: number) {
    // const body = {
    //   idUsuario: idUsuario,
    // };
    return this.http.get(`${this.apiURL}/${idUsuario}`).pipe(
      take(1),
      tap((data: any) => {
        this.usuario = data;
      }),
      catchError(err => {
        console.log(`Error al obtener usuario por ID: ${err.message}`);
        return throwError(err);
      })
    );
  }
  obtenerDetallesUsuarioPorId(idUsuario: number) {
    // const body = {
    //   idUsuario: idUsuario,
    // };
    //return this.http.get(`${this.apiURL}?idUsuarioDetalle=${idUsuario}`).pipe(
    return this.http.get(`${this.apiURL}/${idUsuario}`).pipe(
      map((data: any) => {
        //console.log('Datos del usuario:', data);
        return new Usuario(
          data.idUsuario,
          data.nombre,
          data.apellido,
          data.telefono,
          data.correo,
          data.usuario,
          data.contraseña,
          data.idRol,
          data.idEstadoUsuario
        );}),
        catchError(err => {
          console.log('Error al obtener detalles del usuario:', err);
          return throwError(err);
        }),take(1),
      tap((data: any) => {
        this.usuario = data;
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
    return this.http.post(`${this.apiURL}`, usuario).pipe(
      tap((data: any) => console.log(`Usuario creado con ID ${data.idUsuario}`)),
      catchError(err => {
        console.log(`Error al crear usuario: ${err.message}`);
        return throwError(err);
      })
    );
  }



  // Función para actualizar un usuario por su ID
  actualizarUsuario(usuario: Usuario): Observable<any> {
    console.log(`Usuario a actualizar:`,usuario);
    return this.http.put(`${this.apiURL}/usuario-id-actualizar`, usuario).pipe(
      catchError(err => {
        console.log(`Error al actualizar usuario: ${err.message}`);
        return throwError(err);
      })
    );
  }
}
