export class ListaUsuario {
    idUsuario: number;
    nombre: string;
    apellido: string;
    correo: string;
    usuario: string;
    rol: string;
    estado: string;


    constructor(
        idUsuario: number,
        nombre: string,
        apellido: string,
        correo: string,
        usuario: string,
        rol: string,
        estado: string,

    ) {
        this.idUsuario = idUsuario;
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.usuario = usuario;
        this.rol = rol;
        this.estado = estado;
    }
}
