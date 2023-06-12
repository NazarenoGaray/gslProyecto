import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

import { tap, switchMap, map, take, catchError } from 'rxjs/operators';
import { Cliente } from 'src/app/model/cliente.model';

/* el archivo cliente.service.ts sería el controlador 
que se encarga de manejar la lógica de negocio de la aplicación y comunicarse con la API.
 */

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  // URL de la API CLIENTE
  apiURL = 'http://localhost/GSLogistic/Clientes.php';
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
          cliente.idCliente,
          cliente.nombre,
        ));
      })
    );
  }
  // Función para obtener un cliente por su ID
  getClientePorId(idCliente: number) {
    return this.http.get(`${this.apiURL}?idCliente=${idCliente}`).pipe(
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
      tap((data: any) => console.log(`Cliente creado con ID ${data.idCliente}`)),
      catchError(err => {
        console.log(`Error al crear cliente: ${err.message}`);
        return throwError(err);
      })
    );
  }

  // Función para actualizar un clientepor su ID
  actualizarCliente(idCliente: number, cliente: Cliente): Observable<any> {
    return this.http.put(`${this.apiURL}?idCliente=${idCliente}`, cliente).pipe(
      catchError(err => {
        console.log(`Error al actualizar cliente: ${err.message}`);
        return throwError(err);
      })
    );
  }


  // Función para eliminar un cliente por su ID
  eliminarCliente(idCliente: number): Observable<any> {
    return this.http.delete(`${this.apiURL}?idCliente=${idCliente}`).pipe(
      tap(() => console.log(`Cliente con ID ${idCliente} eliminado`)),
      catchError(error => {
        console.error(error);
        return of(null);
      })
    );
  }
}
