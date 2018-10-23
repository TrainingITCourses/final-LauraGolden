import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LanzamientoRoutingModule } from './lanzamiento-routing-module';
import { LanzamientoComponent } from './lanzamiento/lanzamiento.component';

@NgModule({
  imports: [CommonModule, LanzamientoRoutingModule, SharedModule],
  declarations: [LanzamientoComponent]
})
export class LanzamientoModule {}
