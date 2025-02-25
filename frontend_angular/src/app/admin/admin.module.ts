import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { PerfilComponent } from './components/perfil/perfil.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CategoriaComponent } from './components/inventario/categoria/categoria.component';
import { ProductoComponent } from './components/inventario/producto/producto.component';
import { PedidoCreateComponent } from './components/pedido/pedido-create/pedido-create.component';
import { PedidoListaComponent } from './components/pedido/pedido-lista/pedido-lista.component';
import { PedidoMostrarComponent } from './components/pedido/pedido-mostrar/pedido-mostrar.component';
import { ClienteComponent } from './components/pedido/cliente/cliente.component';
import { PrimeNgModuleModule } from '../prime-ng-module/prime-ng-module.module';


@NgModule({
  declarations: [
    PerfilComponent,
    UsuarioComponent,
    CategoriaComponent,
    ProductoComponent,
    PedidoCreateComponent,
    PedidoListaComponent,
    PedidoMostrarComponent,
    ClienteComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    PrimeNgModuleModule
  ]
})
export class AdminModule { }
