import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Admin',
                items: [
                    { label: 'Administración', icon: 'pi pi-fw pi-home', routerLink: ['/admin'] },
                    { label: 'Mi Perfil', icon: 'pi pi-fw pi-user', routerLink: ['/admin/perfil'] },
                    
                ]
            },
            {
                label: 'Gestión Productos',
                items: [
                    { label: 'Categorias', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/categoria'] },
                    { label: 'Productos', icon: 'pi pi-fw pi-check-square', routerLink: ['/admin/producto'] }
                ]
            },
            {
                label: 'Gestión Pedidos',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Nuevo Pedido',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/admin/pedido/nuevo']
                    },
                    {
                        label: 'Lista Pedido',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/admin/pedido']
                    },
                    {
                        label: 'Clientes',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/admin/cliente']
                    },
                ]
            },
        ];
    }
}
