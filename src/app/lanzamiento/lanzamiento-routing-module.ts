import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LanzamientoComponent } from './lanzamiento/lanzamiento.component';
import { StoreModule } from '@ngrx/store';

const routes: Routes = [
  {
    path: '',
    component: LanzamientoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LanzamientoRoutingModule {}

// , StoreModule.forFeature()