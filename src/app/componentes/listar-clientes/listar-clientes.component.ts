import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/servicios/cliente/cliente.module';
import { ClienteService } from 'src/app/servicios/cliente/cliente.service';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ListarClientesComponent {

  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerClientes();
  }

  // Función para obtener todos los clientes
  obtenerClientes() {
    this.clienteService.obtenerClientes().subscribe((clientes: Cliente[]) => {
      this.clientes = clientes;
    });
  }

  // Función para eliminar un cliente por su ID
  eliminarCliente(id_cliente: number) {
    if (confirm('¿Está seguro de que desea eliminar este cliente?')) {
      this.clienteService.eliminarCliente(id_cliente).subscribe(() => {
        console.log(`Cliente con ID ${id_cliente} eliminado`);
        this.obtenerClientes();
      });
    }
  }
  
  

}
