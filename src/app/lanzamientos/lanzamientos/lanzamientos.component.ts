import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { GlobalState } from '../..';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CargarLanzamientos } from '../../reducers/lanzamientos/lanzamientos.actions';

@Component({
  selector: 'app-lanzamientos',
  templateUrl: './lanzamientos.component.html',
  styleUrls: ['./lanzamientos.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanzamientosComponent implements OnInit {
  public lanzamientos$: Observable<any>;
  private idEstado: any;
  private estadoSel: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<GlobalState>
  ) { }

  ngOnInit() {
    this.cargaObservables();
    this.cargaDatos();
  }

  private cargaDatos() {
    // Cogemos el id del estado para filtrar lanzamientos
    this.idEstado = this.activatedRoute.snapshot.params['id'];
    this.store.dispatch(new CargarLanzamientos([this.idEstado]));
  }

  private cargaObservables() {
    this.lanzamientos$ = this.store.select('lanzamientos').pipe(
      map(Lan => {
        if (Lan.cargados) {
          const idE = this.idEstado;
          this.estadoSel = idE;
          return Lan.lanzamientos;
        }
      })
    );
  }

}
