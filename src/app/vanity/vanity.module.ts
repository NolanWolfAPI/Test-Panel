import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VanityRoutingModule } from './vanity-routing.module';
import { VanityEditorComponent } from './editor/vanity-editor.component';
import { VanityListComponent } from './list/vanity-list.component';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { VanityService } from './vanity.service';

@NgModule({
  declarations: [
    VanityEditorComponent,
    VanityListComponent
  ],
  imports: [
    CommonModule,
    VanityRoutingModule,
    SharedModule,
    FormsModule,
  ],
  providers: [
    VanityService
  ]
})
export class VanityModule { }
