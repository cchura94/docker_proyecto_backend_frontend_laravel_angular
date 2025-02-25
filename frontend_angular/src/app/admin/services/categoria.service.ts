import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  urlBase = environment.apiUrl;

  http = inject(HttpClient);

  constructor() { }

  listar(){
    return this.http.get(`${this.urlBase}/categoria`);
  }

  guardar(datos:any){
    return this.http.post(`${this.urlBase}/categoria`, datos);
  }

  mostrar(id:number){
    return this.http.get(`${this.urlBase}/categoria/${id}`);
  }

  modificar(datos:any){
    return this.http.put(`${this.urlBase}/categoria/${datos.id}`, datos);
  }

  eliminar(id:number){
    return this.http.delete(`${this.urlBase}/categoria/${id}`);
  }

}
