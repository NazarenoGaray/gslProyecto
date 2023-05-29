import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Rol } from 'src/app/model/rol.model';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  apiURL = 'http://localhost/GaryStorageLogistic/ApiRoles.php';

  constructor(private http: HttpClient) { }

  // Aquí se definirán los métodos para consumir la API de roles

  obtenerRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.apiURL);
  }
  obtenerRolPorId(id: number): Observable<Rol> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Rol>(url);
  }
  crearRol(rol: Rol): Observable<Rol> {
    return this.http.post<Rol>(this.apiURL, rol);
  }
  actualizarRol(rol: Rol): Observable<any> {
    const url = `${this.apiURL}/${rol.id_rol}`;
    return this.http.put(url, rol);
  }
  eliminarRol(id: number): Observable<any> {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url);
  }

  obtenerNombreRol(id_rol: number): Observable<string> {
    return this.obtenerRolPorId(id_rol).pipe(
      map((rol: Rol) => rol.rol)
    );
  }
}
