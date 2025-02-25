import { Component, inject, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ProductoService } from '../../../services/producto.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../../../services/categoria.service';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}
@Component({
  selector: 'app-producto',
  standalone: false,

  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss',
})
export class ProductoComponent {
  productoForm = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl('', [Validators.required]),
    categoria_id: new FormControl('', [Validators.required]),
    precio: new FormControl('', Validators.required),
    stock: new FormControl('', Validators.required),
    descripcion: new FormControl(''),
  });

  productoService = inject(ProductoService);
  categoriaService = inject(CategoriaService);

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
  imagen_actual: string = "";
  errors: any = {};
  buscar: string = ''

  constructor() {
    this.getProductos();
    this.getCategorias();
  }

  openNew() {
    this.productoForm.reset();
    this.productDialog = true;
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

  getCategorias() {
    this.categoriaService.listar().subscribe((res: any) => {
      this.categorias = res;
    });
  }

  exportCSV(ev: any) {
    this.dt.exportCSV();
  }

  editProduct(product: any) {
    const { id, nombre, categoria_id, precio, stock, descripcion, imagen } = product;
    this.productoForm.setValue({
      id,
      nombre,
      categoria_id,
      precio,
      stock,
      descripcion,
    });

    this.imagen_actual = 'http://127.0.0.1:8000/'+imagen;

    this.productDialog = true;
  }
  deleteProduct(product: any) {}

  hideDialog() {}

  saveProduct() {
    let nombre = this.productoForm.value.nombre;
    let precio = this.productoForm.value.precio;
    let stock = this.productoForm.value.stock;
    let categoria_id = this.productoForm.value.categoria_id;
    let descripcion = this.productoForm.value.descripcion;

    if(this.productoForm.value.id){
      
  
      const id_prod = this.productoForm.value.id;
      this.productoService.modificar(parseInt(id_prod), this.productoForm.value).subscribe((res) => {
        console.log('Producto Modificado');
        this.productDialog = false;
        this.productoForm.reset();
        this.getProductos();
      }, (error: any) => {
        console.log(error.error?.errors);
        this.errors = error.error?.errors;
      });

    }else{
      const formData = new FormData();
      formData.append('nombre', nombre+'');
      formData.append('precio', `${precio}`);
      formData.append('stock', `${stock}`);
      formData.append('categoria_id', `${categoria_id}`);
      formData.append('descripcion', `${descripcion}`);
      formData.append('imagen', this.imagen_seleccionado);
  
      this.productoService.guardar(formData).subscribe((res) => {
        console.log('Producto registrado');
        this.productDialog = false;
        this.productoForm.reset();
        this.getProductos();
      }, (error: any) => {
        console.log(error.error?.errors);
        this.errors = error.error?.errors;
      });

    }

  }

  funSeleccionarImagen(ev: any) {
    console.log(ev.target.files[0]);
    this.imagen_seleccionado = ev.target.files[0];
  }

  funBuscar(){
    this.getProductos();
  }
}
