import { Pipe, PipeTransform } from '@angular/core';
import { Cliente } from '../clases/cliente';

@Pipe({
  name: 'filtroClientes'
})
export class FiltroClientesPipe implements PipeTransform {

  transform(value: Cliente[], filtro: String): Cliente[] {
    if(filtro == ""){ 
      return value;
    }
    return value.filter(t=> t.nombre.toLowerCase()
    .includes(filtro.toLowerCase()) || t.nombre.toLowerCase()
    //.includes(filtro.toLowerCase()) || t.usuario.toString().toLowerCase()
    //.includes(filtro.toLowerCase()) || t.correo.toString().toLowerCase()
    .includes(filtro.toLowerCase())  );
  }

}
