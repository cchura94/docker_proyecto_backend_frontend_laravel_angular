import { Component, inject } from '@angular/core';
import { CategoriaService } from '../../../services/categoria.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-categoria',
  standalone: false,

  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss',
})
export class CategoriaComponent {
  categoriaService = inject(CategoriaService);

  categorias: any[] = [];
  visible: boolean = false;
  loading: boolean = false;

  categoriaForm = new FormGroup({
      id: new FormControl(''),
      nombre: new FormControl(''),
      detalle: new FormControl(''),
  });

  constructor() {
    this.funListar()
  }

  funListar(){
    this.loading = true
    this.categoriaService.listar().subscribe(
      (data: any) => {
        console.log(data);
        this.categorias = data;
        this.loading = false
      },
      (error: any) => {
        console.log(error);
        this.loading = false
      }
    );
  }

  funGuardar(){
    if(this.categoriaForm.value.id){
      this.categoriaService.modificar(this.categoriaForm.value).subscribe(
        (data: any) => {
          console.log(data);
          this.categoriaForm.reset();
  
          this.visible = false;
          this.funListar()
        },
        (error: any) => {
          console.log(error);
        }
      );
    }else {

      this.categoriaService.guardar(this.categoriaForm.value).subscribe(
        (data: any) => {
          console.log(data);
          this.categoriaForm.reset();
  
          this.visible = false;
          this.funListar()
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }

  showDialog(){
    this.visible = true;
  }

  funEditar(cate: any){
    const {id, nombre, detalle} = cate;
    this.categoriaForm.setValue({id, nombre, detalle});
    this.visible = true;

  }

  funEliminar(id: number){
    if(confirm('¿Está seguro de eliminar?')){

      this.categoriaService.eliminar(id).subscribe(
        (data: any) => {
          console.log(data);
          this.funListar();
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }
}
