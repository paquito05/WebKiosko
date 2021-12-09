import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../md/md.module';
import { NouisliderModule } from "ng2-nouislider";
import { TagInputModule } from "ngx-chips";
import { MaterialModule } from '../app.module';

import { InventarioComponent } from './inventario.component';
import { InventarioRoutes } from './inventario.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(InventarioRoutes),
        FormsModule,
        MdModule,
        MaterialModule,
        NouisliderModule,
        TagInputModule,
    ],
    declarations: [InventarioComponent]
})

export class InventarioModule { }
