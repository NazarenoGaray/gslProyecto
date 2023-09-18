export class Usuario {
  idUsuario: number;
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
  usuario: string;
  contraseña: string;
  idRol: number;
  idEstadoUsuario: number;

  constructor(
    idUsuario: number,
    nombre: string,
    apellido: string,
    telefono: string,
    correo: string,
    usuario: string,
    contraseña: string,
    idRol: number,
    idEstadoUsuario: number,

  ) {
    this.idUsuario = idUsuario;
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
    this.correo = correo;
    this.usuario = usuario;
    this.contraseña = contraseña;
    this.idRol = idRol;
    this.idEstadoUsuario = idEstadoUsuario;

  }
}
  