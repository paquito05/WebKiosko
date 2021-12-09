import { Routes } from '@angular/router';

import { VentasComponent } from './ventas.component';

export const VentasRoutes: Routes = [
  {

    path: '',
    children: [{
      path: '',
      component: VentasComponent
    }]
  }
];
