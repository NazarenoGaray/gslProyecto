import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../clases/usuario';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(value: Usuario[], filtro: String): Usuario[] {
    if(filtro == ""){ 
      return value;
    }
    return value.filter(t=> t.nombre.toLowerCase()
    .includes(filtro.toLowerCase()) || t.apellido.toLowerCase()
    //.includes(filtro.toLowerCase()) || t.usuario.toString().toLowerCase()
    .includes(filtro.toLowerCase()) || t.correo.toString().toLowerCase()
    .includes(filtro.toLowerCase())  );
  }

}
