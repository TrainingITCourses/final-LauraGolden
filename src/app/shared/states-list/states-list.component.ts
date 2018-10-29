import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import { Estado } from 'src/app/interfaces/estado';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GlobalState } from '../..';
import { CargarNombre } from '../../reducers/estados/estados.actions';

@Component({
  selector: 'app-states-list',
  templateUrl: './states-list.component.html',
  styleUrls: ['./states-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatesListComponent implements OnInit {
  @Input() public estados: any[];

  constructor(private router: Router, private store: Store<GlobalState>) { }

  ngOnInit() {
    console.log('states-List_ngOnInit');
  }

  onEstadoSeleccionado(est: Estado) {
    // lanzamos los lanzamientos de un estado seleccionado
    this.store.dispatch(new CargarNombre(est.name));
    this.router.navigate( ['/lanzamientos', est.id ] );
  }
}
