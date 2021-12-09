import { Routes } from '@angular/router';

import { ProductosComponent } from './productos.component';

export const ProductosRoutes: Routes = [
    {

      path: '',
      children: [ {
        path: 'productos',
        component: ProductosComponent
    }]
}
];
