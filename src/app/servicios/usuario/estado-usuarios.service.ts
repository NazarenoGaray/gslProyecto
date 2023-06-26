import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstadoUsuaro } from 'src/app/clases/estado-usuario.model';

@Injectable({
  providedIn: 'root'
})
export class EstadoUsuariosService {
  private apiUrl = 'http://localhost/GSLogistic/EstadoUsuarios.php';

  constructor(private http: HttpClient) { }

  obtenerEstadosUsuarios(): Observable<EstadoUsuaro[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  obtenerEstadoUsuarioPorId(idEstadoUsuario: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?idEstadoUsuario=${idEstadoUsuario}`);
  }

  crearEstadoUsuario(estadoUsuario: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, estadoUsuario);
  }

  actualizarEstadoUsuario(idEstadoUsuario: number, estadoUsuario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}`, estadoUsuario, { params: { idEstadoUsuario: idEstadoUsuario.toString() } });
  }

  eliminarEstadoUsuario(idEstadoUsuario: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}`, { params: { idEstadoUsuario: idEstadoUsuario.toString() } });
  }
}
