import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  urlBase = environment.apiUrl;

  constructor() { }

  http = inject(HttpClient);
listar(page: number=1, limit: number=10, q: any = ''){
  return this.http.get(`${this.urlBase}/pedido?page=${page}&limit=${limit}&q=${q}`);
}

guardar(datos:any){
  return this.http.post(`${this.urlBase}/pedido`, datos);
}

mostrar(id:number){
  return this.http.get(`${this.urlBase}/pedido/${id}`);
}

generarReportePedidos(){
  return this.http.get(`${this.urlBase}/pedido/reporte-PDF`, {responseType: 'blob'});
}

generarReporteMostrarPedido(id: any){
  return this.http.get(`${this.urlBase}/pedido/${id}/reporte-PDF-mostrar`, {responseType: 'blob'});
}


  
}
