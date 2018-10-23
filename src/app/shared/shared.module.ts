import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { LaunchesCardComponent } from './launches-card/launches-card.component';
import { LaunchesListComponent } from './launches-list/launches-list.component';
import { StatesListComponent } from './states-list/states-list.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    CounterComponent,
    LaunchesCardComponent,
    LaunchesListComponent,
    StatesListComponent
  ],
  exports: [
    CounterComponent,
    LaunchesCardComponent,
    LaunchesListComponent,
    StatesListComponent,
    RouterModule
  ]
})
export class SharedModule {}
