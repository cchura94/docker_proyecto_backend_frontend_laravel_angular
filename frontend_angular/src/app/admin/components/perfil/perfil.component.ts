import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: false,
  
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {

  perfil: any = {}

  authService = inject(AuthService)
  router = inject(Router)

  constructor(){
    this.funGetPerfil()
  }

  funGetPerfil(){
    this.authService.perfil().subscribe(
      (resp) => {
        this.perfil = resp;
      },
      (error) => {
        // alert("Error al recuperar el Perfil")
      },
    )
  }

  funSalir(){
    this.authService.logout().subscribe(
      (resp) => {
        localStorage.removeItem('access_token');
        this.router.navigate(['/auth/login'])
      }
    )
  }
}
