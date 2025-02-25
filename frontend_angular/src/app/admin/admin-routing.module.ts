import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './components/perfil/perfil.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CategoriaComponent } from './components/inventario/categoria/categoria.component';
import { ProductoComponent } from './components/inventario/producto/producto.component';
import { PedidoListaComponent } from './components/pedido/pedido-lista/pedido-lista.component';
import { PedidoCreateComponent } from './components/pedido/pedido-create/pedido-create.component';
import { PedidoMostrarComponent } from './components/pedido/pedido-mostrar/pedido-mostrar.component';

const routes: Routes = [
  {
    path: 'perfil',
    component: PerfilComponent
  },
  {
    path: 'usuario',
    component: UsuarioComponent
  },
  {
    path: 'categoria',
    component: CategoriaComponent
  },
  {
    path: 'producto',
    component: ProductoComponent
  },
  {
    path: 'pedido',
    component: PedidoListaComponent
  },
  {
    path: 'pedido/nuevo',
    component: PedidoCreateComponent
  },
  {
    path: 'pedido/:id',
    component: PedidoMostrarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
