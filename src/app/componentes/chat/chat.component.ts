import { Component, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, orderBy, query, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  public usuarioActual: any = 'n.garay';
  public nombreDestinatario: any = 'pepe';
  public msj: string = "";
  public usuarios!: Observable<any[]>;
  public item!: Observable<any[]>;
  firestore: Firestore = inject(Firestore);

  public mensaje: any[] = [];

  constructor() {
    const usuarioCollection = collection(this.firestore, 'usuarios');
    this.usuarios = collectionData(usuarioCollection);
    const mensajeCollection = collection(this.firestore, 'mensajes'); // Cambia 'mensaje' por el nombre correcto de tu colección
    collectionData(query(mensajeCollection, orderBy('fecha'), orderBy('hora'))).subscribe(t => this.mensaje = t, error => console.log(error));
  }

  agregar() {
    const nuevoMensaje = {
      remitente: this.usuarioActual,
      destinatario: this.nombreDestinatario,
      texto: this.msj,
      fecha: new Date().toLocaleDateString(),
      hora: new Date().toLocaleTimeString()
    };
    addDoc(collection(this.firestore, 'mensajes'), nuevoMensaje);
    this.msj = '';
    // var id = Math.random() * 10000000 * (new Date()).getMilliseconds();
    // setDoc(doc(this.firestore,'mensaje',id.toString() ),{ name: this.msj});
  }
  esMensajeDelUsuarioActual(remitente: string, destinatario: string): boolean {
    if (remitente === this.usuarioActual) {
      //console.log("es verdadero");
      if (destinatario === this.nombreDestinatario) {
        return true;
      }
    }
      //console.log("mensajeUsuario: ",mensajeUsuario);
      //console.log("this.usuarioActual: ", this.usuarioActual)
    return false;
  }
}
