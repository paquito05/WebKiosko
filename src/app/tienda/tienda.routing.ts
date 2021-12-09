import { Routes } from '@angular/router';
import { DetalleTiendaComponent } from './detalletienda/detalletienda.component';

import { TiendasComponent } from './tiendas/tiendas.component';

export const TiendaRoutes: Routes = [
  {

    path: '',
    children: [{
      path: 'tienda',
      component: TiendasComponent
    },
    {
      path: 'tienda',
      children:[{
        path: 'detalletienda',
        component: DetalleTiendaComponent
      }]
    }]
  },
 
];
