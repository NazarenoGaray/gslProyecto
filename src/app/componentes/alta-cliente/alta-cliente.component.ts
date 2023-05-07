import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/servicios/cliente/cliente.module';
import { ClienteService } from 'src/app/servicios/cliente/cliente.service';

@Component({
  selector: 'app-alta-cliente',
  templateUrl: './alta-cliente.component.html',
  styleUrls: ['./alta-cliente.component.css']
})
export class AltaClienteComponent {

  clienteForm!: FormGroup;
  cliente!: Cliente;


  constructor(private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private router: Router) { }

  ngOnInit(): void {
    this.clienteForm = this.formBuilder.group({
      nombre: ['', Validators.required],
    });
  }
  validateCorreo(control: AbstractControl): { [key: string]: any } | null {
    if (control.value && control.value.length < 5) {
      return { 'correoInvalido': true };
    }
    return null;
  }
  agregarCliente() {
    const clienteFormulario = this.clienteForm.value;

    this.clienteService.crearCliente(clienteFormulario).subscribe(
      (res: any) => {
        console.log(`Cliente creado con ID ${res.id_cliente}`);
        this.router.navigate(['/listar-clientes']);
      },
      (err: any) => {
        console.log(`Error al crear cliente: ${err.message}`);
      }
    );
  }


}
