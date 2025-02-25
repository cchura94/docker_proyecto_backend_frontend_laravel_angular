import { Component, inject, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ProductoService } from '../../../services/producto.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ClienteService } from '../../../services/cliente.service';
import { PedidoService } from '../../../services/pedido.service';

import Swal from 'sweetalert2'

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

@Component({
  selector: 'app-pedido-create',
  standalone: false,

  templateUrl: './pedido-create.component.html',
  styleUrl: './pedido-create.component.scss',
})
export class PedidoCreateComponent {
  carrito: any[] = [];

  productoService = inject(ProductoService);
  clienteService = inject(ClienteService);
  pedidoService = inject(PedidoService);

  @ViewChild('dt') dt!: Table;
  productos: any[] = [];
  // cols!: Column[];
  cols: Column[] = [];

  totalRecords: number = 6;

  loading: boolean = false;
  productDialog: boolean = false;
  submitted: boolean = false;

  categorias: any[] = [];
  imagen_seleccionado: any = null;
  imagen_actual: string = '';
  errors: any = {};
  buscar: string = '';
  cliente_seleccionado: any = {};

  clienteForm = new FormGroup({
    nombre_completo: new FormControl(''),
    correo: new FormControl(''),
    ci: new FormControl(''),
    telefono: new FormControl(''),
  });

  visibleCliente: boolean = false;

  constructor() {
    this.getProductos();
  }
  cargarProductos(event: any) {
    console.log(event);
    let page = event.first / event.rows + 1;

    this.getProductos(page, event.rows);
  }

  getProductos(page: number = 1, limit: number = 5) {
    this.loading = true;
    this.productoService.listar(page, limit, this.buscar).subscribe(
      (res: any) => {
        console.log(res);
        this.productos = res.data;
        this.totalRecords = res.total;

        this.loading = false;
      },
      (error: any) => {
        this.loading = false;
      }
    );
  }

  funBuscar() {
    this.getProductos();
  }

  addCarrito(producto: any) {
    const prod = {
      producto_id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1,
    };

    this.carrito.push(prod);
  }

  showDialogCliente() {
    this.visibleCliente = true;
  }

  funGuardarCliente() {
    this.clienteService
      .guardar(this.clienteForm.value)
      .subscribe((res: any) => {
        this.cliente_seleccionado = res.cliente;
      });
    this.visibleCliente = false;
  }

  funGuardarPedido() {
    if(this.cliente_seleccionado.id && this.carrito.length>0){
      const pedidoData = {
          "cliente_id": this.cliente_seleccionado.id,
          "observacion": "SIN OBSERVACIÓN",
          "detalle_pedido": this.carrito
      }
  
      this.pedidoService.guardar(pedidoData).subscribe(
        (res: any) => {
  
          this.clienteForm.reset()
          this.carrito = []
          this.cliente_seleccionado = {};
          Swal.fire({
            title: "Correcto!",
            text: "Pedido Registrado!",
            icon: "success"
          });
        },
        (error: any) => {
          Swal.fire({
            title: "Error!",
            text: "Error al generar el Pedido!",
            icon: "error"
          });
        }
      )

    }else{
      Swal.fire({
        title: "Debe Agregar Producto o Seleccionar un Cliente!",
        text: "Error al generar el Pedido!",
        icon: "warning"
      });
    }
  }
}
