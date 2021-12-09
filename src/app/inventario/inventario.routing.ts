import { Routes } from '@angular/router';

import { InventarioComponent } from './inventario.component';

export const InventarioRoutes: Routes = [
  {

    path: '',
    children: [{
      path: '',
      component: InventarioComponent
    }]
  }
];
