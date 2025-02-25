import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

interface Credencial{
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlBase = "http://127.0.0.1:8000/api";

  http = inject(HttpClient)

  constructor() { }

  login(credenciales: any){
    return this.http.post(this.urlBase + "/v1/auth/login", credenciales);
  }

  register(datos: any){
    return this.http.post(this.urlBase + "/v1/auth/register", datos);
  }

  perfil(){
    return this.http.get(this.urlBase + "/v1/auth/profile", {headers: {Authorization: 'Bearer 7|oRpYBVYlzjl5TXRCqfI62wPaRVmBN0M7VsJ1C4k6e0f31651'}});
  }

  logout(){
    return this.http.post(this.urlBase + "/v1/auth/logout", {});
  }
}
