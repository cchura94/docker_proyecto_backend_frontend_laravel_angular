import { Routes } from '@angular/router';
import { InicioComponent } from './web/inicio/inicio.component';
import { ContactosComponent } from './web/contactos/contactos.component';
import { ServiciosComponent } from './web/servicios/servicios.component';
import { LoginComponent } from './auth/login/login.component';
import { AppLayout } from './layout/component/app.layout';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: InicioComponent
            },
            {
                path: 'contactos',
                component: ContactosComponent
            },
            {
                path: 'servicios',
                component: ServiciosComponent
            }

        ]
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'admin',
        component: AppLayout,
        children: [
            {
                path: '',
                loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
            }
        ],
        canActivate: [authGuard]

    }
];
