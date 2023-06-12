export class Usuario {
    constructor(
      public idUsuario: number,
      public nombre: string,
      public apellido: string,
      public telefono: string,
      public correo: string,
      public usuario: string,
      public contrasena: string,
      public idRol: number,
      public idEstadoUsuario: number,
    ) {}
  }
  