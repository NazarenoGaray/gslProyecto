import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Cliente } from './cliente.module';
import { tap, switchMap, map, take, catchError } from 'rxjs/operators';

/* el archivo cliente.service.ts sería el controlador 
que se encarga de manejar la lógica de negocio de la aplicación y comunicarse con la API.
 */

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  // URL de la API CLIENTE
  apiURL = 'http://localhost/GaryStorageLogistic/apiCliente.php';
  // Lista de cliente
  cliente = [];
  // Cliente seleccionado (si lo hay)
  clienteSeleccionado = null;

  // Constructor del componente
  constructor(private http: HttpClient) {  }
  getDatos() {
    return this.http.get(`${this.apiURL}/datos`);
  }
  // Función para obtener todos los cliente
  obtenerClientes(): Observable<Cliente[]> {
    return this.http.get(this.apiURL).pipe(
      map((data: any) => {
        return data.map((cliente: any) => new Cliente(
          cliente.id_cliente,
          cliente.nombre,
        ));
      })
    );
  }
  // Función para obtener un cliente por su ID
  obtenerClientePorId(id_cliente: number) {
    return this.http.get(`${this.apiURL}?id_cliente=${id_cliente}`).pipe(
      take(1),
      tap((data: any) => {
        this.clienteSeleccionado = data;
      }),
      catchError(err => {
        console.log(`Error al obtener cliente por ID: ${err.message}`);
        return throwError(err);
      })
    );
  }
   // Función para crear un nuevo cliente
   crearCliente(cliente: Cliente) {
    return this.http.post(this.apiURL, cliente).pipe(
      tap((data: any) => console.log(`Cliente creado con ID ${data.id_cliente}`)),
      catchError(err => {
        console.log(`Error al crear cliente: ${err.message}`);
        return throwError(err);
      })
    );
  }

  // Función para actualizar un clientepor su ID
  actualizarCliente(id_cliente: number, cliente: Cliente): Observable<any> {
    return this.http.put(`${this.apiURL}?id_cliente=${id_cliente}`, cliente).pipe(
      catchError(err => {
        console.log(`Error al actualizar cliente: ${err.message}`);
        return throwError(err);
      })
    );
  }


  // Función para eliminar un cliente por su ID
  eliminarCliente(id_cliente: number): Observable<any> {
    return this.http.delete(`${this.apiURL}?id_cliente=${id_cliente}`).pipe(
      tap(() => console.log(`Cliente con ID ${id_cliente} eliminado`)),
      catchError(error => {
        console.error(error);
        return of(null);
      })
    );
  }
}
