import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Rol } from 'src/app/clases/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  apiURL = 'http://localhost/GSLogistic/Roles.php';

  constructor(private http: HttpClient) { }

  // Aquí se definirán los métodos para consumir la API de roles

  obtenerRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.apiURL);
  }
  obtenerRolPorId(id: number): Observable<Rol> {
    //console.log("idRol enviado",id);
    const url = `${this.apiURL}?idRol=${id}`;
    return this.http.get<Rol>(url);
  }
  crearRol(rol: Rol): Observable<Rol> {
    return this.http.post<Rol>(this.apiURL, rol);
  }
  actualizarRol(rol: Rol): Observable<any> {
    const url = `${this.apiURL}/${rol.idRol}`;
    return this.http.put(url, rol);
  }
  eliminarRol(id: number): Observable<any> {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url);
  }

  obtenerNombreRol(idRol: number): Observable<string> {
    return this.obtenerRolPorId(idRol).pipe(
      map((rol: Rol) => rol.rol)
    );
  }
}
