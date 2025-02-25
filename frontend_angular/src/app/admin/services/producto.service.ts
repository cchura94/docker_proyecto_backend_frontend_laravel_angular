import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

   urlBase = environment.apiUrl;

    http = inject(HttpClient);

  constructor() { }

  listar(page: number=1, limit: number=10, q: any = ''){
    return this.http.get(`${this.urlBase}/producto?page=${page}&limit=${limit}&q=${q}`);
  }

  guardar(datos:any){
    return this.http.post(`${this.urlBase}/producto`, datos);
  }

  mostrar(id:number){
    return this.http.get(`${this.urlBase}/producto/${id}`);
  }

  modificar(id:number, datos:any){
    return this.http.put(`${this.urlBase}/producto/${id}`, datos);
  }

  eliminar(id:number){
    return this.http.delete(`${this.urlBase}/producto/${id}`);
  }

}
