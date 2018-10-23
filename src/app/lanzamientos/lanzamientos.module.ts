import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LanzamientosRoutingModule } from './lanzamientos-routing-module';
import { LanzamientosComponent } from './lanzamientos/lanzamientos.component';
import { LanzamientosEffects } from '../reducers/lanzamientos/lanzamientos.effects';
import { reducer } from '../reducers/lanzamientos/lanzamientos.reducer';


@NgModule({
  imports: [
    CommonModule,
    LanzamientosRoutingModule,
    SharedModule,
    StoreModule.forFeature('lanzamientosFeature', { lanzamientos: reducer }),
    EffectsModule.forFeature([LanzamientosEffects])
  ],
  declarations: [LanzamientosComponent]
})
export class LanzamientosModule {}
