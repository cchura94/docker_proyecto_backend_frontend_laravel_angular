import { Component, inject } from '@angular/core';
import { PedidoService } from '../../../services/pedido.service';

@Component({
  selector: 'app-pedido-lista',
  standalone: false,
  
  templateUrl: './pedido-lista.component.html',
  styleUrl: './pedido-lista.component.scss'
})
export class PedidoListaComponent {
  pedidos: any[] = [];
  pedido: any = {};

  pedidoService = inject(PedidoService);

  dialogVisible: boolean = false;

  constructor(){
    this.getPedidos()
  }

  getPedidos(){
    this.pedidoService.listar().subscribe(
      (res: any) => {
        this.pedidos = res.data;
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  showDialog(p: any){
    this.pedido = p
    this.dialogVisible = true
  }

  descargarPDF(){
    this.pedidoService.generarReportePedidos().subscribe(
      (res: Blob) => {

        const url = window.URL.createObjectURL(res);

        const a = document.createElement('a');
        a.href = url;
        a.download = "documento_pedidos.pdf";
        a.click();

        window.URL.revokeObjectURL(url)

      }
    )
  }

  mostrarPedidoPDF(id: any){
    this.pedidoService.generarReporteMostrarPedido(id).subscribe(
      (res: Blob) => {

        const url = window.URL.createObjectURL(res);

        const a = document.createElement('a');
        a.href = url;
        a.download = "pedido"+id+".pdf";
        a.click();

        window.URL.revokeObjectURL(url)

      }
    )
  }

}
