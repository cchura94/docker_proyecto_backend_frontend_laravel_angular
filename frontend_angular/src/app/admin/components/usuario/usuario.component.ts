import { Component, inject } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  standalone: false,
  
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent {

  usuarioService = inject(UsuarioService);

  usuarios: any[] = [];
  visible: boolean = false

  usuarioForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });


  constructor(){
    this.getUsuarios()
  }

  getUsuarios(){
    this.usuarioService.listar().subscribe(
      (respuesta: any) => {
        console.log(respuesta);
        this.usuarios = respuesta;
      },
      (error) => {

      }
    );
  }

  funGuardarUsuario(){
    this.usuarioService.guardar(this.usuarioForm.value).subscribe(
      (respuesta: any) => {
        console.log(respuesta);

        this.getUsuarios()

        this.usuarioForm.reset();

        this.visible = false;

      },
      (error) => {

      }
    );
  }

  mostrarDialog(){
    this.visible = true;
  }

}
