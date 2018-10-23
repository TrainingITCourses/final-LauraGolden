import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '',
    loadChildren: '../home/home.module#HomeModule',
    data: { title: 'Estados' }
  },
  {
    path: 'lanzamientos/:id',
    loadChildren: '../lanzamientos/lanzamientos.module#LanzamientosModule',
    data: { title: 'Lanzamientos de un estado' }
  },
  {
    path: 'lanzamiento/:id',
    loadChildren: '../lanzamiento/lanzamiento.module#LanzamientoModule',
    data: { title: 'Detalle Lanzamiento' }
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
