import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authService = inject(AuthService)
  router = inject(Router)

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  funLogin(){
    this.authService.login(this.loginForm.value).subscribe(
      (resp: any) => {
        console.log(resp)
        localStorage.setItem('access_token', resp.access_token)
        this.router.navigate(["/admin/perfil"])
      },
      (error) => {
        console.log(error);
        alert("Error al autenticar")
      }
    )
  }
}
