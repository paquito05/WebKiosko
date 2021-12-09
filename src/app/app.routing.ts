import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'pages/login',
        pathMatch: 'full',
    },
    {
        path: '',
        component: AuthLayoutComponent,
        children: [{
            path: 'pages',
            loadChildren: './pages/pages.module#PagesModule'
        }]
    }, {

        path: '',
        component: AdminLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: './tienda/tienda.module#TiendaModule'
            },
            {
                path: 'ventas',
                loadChildren: './ventas/ventas.module#VentasModule'
            },
            {
                path: 'inventario',
                loadChildren: './inventario/inventario.module#InventarioModule'
            },

            {
                path: 'compras',
                loadChildren: './compras/compras.module#ComprasModule'
            }
        ]
    }
];
