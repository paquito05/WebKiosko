import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';
import { NouisliderModule } from "ng2-nouislider";
import { TagInputModule } from "ngx-chips";

import { ComprasComponent } from './compras.component';
import { ComprasRoutes } from './compras.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ComprasRoutes),
        FormsModule,
        MdModule,
        MaterialModule,
        NouisliderModule,
        TagInputModule,
    ],
    declarations: [ComprasComponent]
})

export class ComprasModule { }
