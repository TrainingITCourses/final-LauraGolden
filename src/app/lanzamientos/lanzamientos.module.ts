import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LanzamientosRoutingModule } from './lanzamientos-routing-module';
import { LanzamientosComponent } from './lanzamientos/lanzamientos.component';

@NgModule({
  imports: [CommonModule, LanzamientosRoutingModule, SharedModule],
  declarations: [LanzamientosComponent]
})
export class LanzamientosModule {}
