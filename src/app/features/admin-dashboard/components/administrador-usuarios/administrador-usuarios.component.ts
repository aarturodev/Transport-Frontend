import { Component } from '@angular/core';

@Component({
  selector: 'app-administrador-usuarios',
  standalone: true,
  imports: [],
  templateUrl: './administrador-usuarios.component.html',
  styleUrl: './administrador-usuarios.component.css'
})
export default class AdministradorUsuariosComponent {

  crearUsuario = true;

   showModal = false;
  toggleModal(){
    this.showModal = !this.showModal;
  }

  editar(){
    this.crearUsuario = false;
    this.showModal = !this.showModal;
  }

}
