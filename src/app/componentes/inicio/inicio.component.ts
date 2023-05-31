import { Component } from '@angular/core';
import { TokenService } from 'src/app/servicios/token/token.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  constructor(
    
    private tokenService: TokenService
  ){}

  
  isLoggedIn(): boolean {
    return this.tokenService.hasToken(); // Implementa el método hasToken() en tu servicio de tokens para verificar si hay un token almacenado.
  }
}
