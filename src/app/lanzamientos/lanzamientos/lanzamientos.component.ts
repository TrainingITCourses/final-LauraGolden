import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GlobalState } from '../..';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CargarLanzamientos } from '../../reducers/lanzamientos/lanzamientos.actions';
import { CargarRuta } from 'src/app/reducers/rutas/rutas.actions';
import { CargaEstado } from '../../reducers/estado/estado.actions';


@Component({
  selector: 'app-lanzamientos',
  templateUrl: './lanzamientos.component.html',
  styleUrls: ['./lanzamientos.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanzamientosComponent implements OnInit {
  public lanzamientos$: Observable<any>;
  private idEstado: any;
  public estadoSel: number;
  public estado$: Observable<any>;
  private estadoActual: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<GlobalState>,
  ) { }

  ngOnInit() {
    this.idEstado = this.activatedRoute.snapshot.params['id'];
    this.cargaObservables();
    this.cargaDatos();
  }

  private cargaDatos() {
    // Cogemos el id del estado para filtrar lanzamientos
    this.store.dispatch(new CargaEstado([this.idEstado]));
    this.store.dispatch(new CargarLanzamientos([this.idEstado, 2])); // Por defecto se ordena siempre Desc
  }

  private cargaObservables() {
    let _this = this;

    this.lanzamientos$ = this.store.select('lanzamientos').pipe(
      map(Lan => {
        if (Lan.cargados) {
          const idE = _this.idEstado;
          _this.estadoSel = idE;
          return Lan.lanzamientos;
        }
      })
    );

    this.store.subscribe(
      st => {
        const estado = st.estados.estados.filter(estActual => estActual.id === Number(_this.idEstado));
        if (estado.length > 0) {
          // Ya se que no es la solución más idónea (con más tiempo buscaría otra), pero si no se me quedaba bloqueado
          if (_this.estadoActual === undefined) {
            _this.estadoActual = estado[0].id;
            this.store.dispatch(
                new CargarRuta([
                    'Estado: ' + estado[0].name + ' - ' + estado[0].description ,
                    true, // ver boton volver
                    true, // ver botones fechas
                    _this.idEstado,
                    'Lanzamientos' ]));
          } else if (estado[0].id !== _this.estadoActual) {
            _this.estadoActual = estado[0].id;
            this.store.dispatch(
                new CargarRuta([
                  'Estado: ' + estado[0].name + ' - ' + estado[0].description ,
                  true,
                  true,
                   _this.idEstado,
                   'Lanzamientos' ]));
          }
        }
      }
    );
  }
}
