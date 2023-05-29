export class Usuario {
    constructor(
      public id_usuario: number,
      public nombre: string,
      public apellido: string,
      public telefono: string,
      public correo: string,
      public usuario: string,
      public contrasena: string,
      public id_rol: number,
      public id_estado_usuario: number,
    ) {}
  }
  