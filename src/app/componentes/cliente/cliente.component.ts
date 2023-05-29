import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente.model';
import { ClientesService } from 'src/app/servicios/clientes/clientes.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  cliente!: Cliente;
  constructor(
    private clientesService: ClientesService,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.getCliente();
  }
  
  getCliente() {
    const idCliente = parseInt(this.route.snapshot.params['id'], 10);
    this.clientesService.getClientePorId(idCliente).subscribe(
      (data: Cliente) => {
        this.cliente = data;
      },
      error => {
        console.log('Error al obtener los detalles del cliente:', error);
      }
    );
  }
}
function subscribe(arg0: (data: any[]) => void, arg1: (error: any) => void) {
  throw new Error('Function not implemented.');
}

