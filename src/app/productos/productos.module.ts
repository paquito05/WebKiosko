import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';

import { ProductosComponent } from './productos.component';
import { ProductosRoutes } from './productos.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ProductosRoutes),
        FormsModule,
        MdModule,
        MaterialModule
    ],
    declarations: [ProductosComponent]
})

export class ProductosModule {}
