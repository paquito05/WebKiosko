import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';

import { TiendasComponent } from './tiendas/tiendas.component';
import { TiendaRoutes } from '../tienda/tienda.routing';
import { DetalleTiendaComponent } from './detalletienda/detalletienda.component';



@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(TiendaRoutes),
        FormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [TiendasComponent, DetalleTiendaComponent]
})

export class TiendaModule { }
