import { Routes } from '@angular/router';

import { ComprasComponent } from './compras.component';

export const ComprasRoutes: Routes = [
  {

    path: '',
    children: [{
      path: '',
      component: ComprasComponent
    }]
  }
];
