import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LanzamientoRoutingModule } from './lanzamiento-routing-module';
import { LanzamientoComponent } from './lanzamiento/lanzamiento.component';
import { LanzamientoEffects } from '../reducers/lanzamiento/lanzamiento.effects';
import { reducer } from '../reducers/lanzamiento/lanzamiento.reducer';


@NgModule({
  imports: [
    CommonModule,
    LanzamientoRoutingModule,
    SharedModule,
    StoreModule.forFeature('lanzamientoFeature', { lanzamiento: reducer }),
    EffectsModule.forFeature([LanzamientoEffects])
  ],
  declarations: [LanzamientoComponent]
})
export class LanzamientoModule {}
