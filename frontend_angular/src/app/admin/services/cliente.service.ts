import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  urlBase = environment.apiUrl;

  http = inject(HttpClient);

  constructor() { }

  listar(){
    return this.http.get(`${this.urlBase}/cliente`);
  }

  guardar(datos:any){
    return this.http.post(`${this.urlBase}/cliente`, datos);
  }

  mostrar(id:number){
    return this.http.get(`${this.urlBase}/cliente/${id}`);
  }

  modificar(datos:any){
    return this.http.put(`${this.urlBase}/cliente/${datos.id}`, datos);
  }

  eliminar(id:number){
    return this.http.delete(`${this.urlBase}/cliente/${id}`);
  }

}
