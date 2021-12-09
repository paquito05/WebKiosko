import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';

import { VentasComponent } from './ventas.component';
import { VentasRoutes } from './ventas.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(VentasRoutes),
        FormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [VentasComponent]
})

export class VentasModule { }
