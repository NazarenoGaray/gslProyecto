import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente.model';
import { ClientesService } from 'src/app/servicios/clientes/clientes.service';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent  implements OnInit{
  
  clientes: Cliente[] = [];
  
  constructor(
    private clientesService: ClientesService,
    private router: Router
  ){}
   
  ngOnInit(): void {
    this.obtenerClientes();
  }
  obtenerClientes() {
    this.clientesService.obtenerClientes().subscribe((clientes: Cliente[]) => {
      this.clientes = clientes;
    });
  }
}
