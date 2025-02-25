import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  urlBase = environment.apiUrl;
  http = inject(HttpClient);

  constructor(/*private http:HttpClient*/) { }

  listar(){
    return this.http.get(`${this.urlBase}/usuario`);
  }

  guardar(datos:any){
    return this.http.post(`${this.urlBase}/usuario`, datos);
  }

  mostrar(id:number){
    return this.http.get(`${this.urlBase}/usuario/${id}`);
  }

  modificar(id:number, datos:any){
    return this.http.put(`${this.urlBase}/usuario/${id}`, datos);
  }

  eliminar(id:number){
    return this.http.delete(`${this.urlBase}/api/usuario/+${id}`);
  }

}
