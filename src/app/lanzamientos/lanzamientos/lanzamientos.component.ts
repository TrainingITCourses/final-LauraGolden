import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GlobalState } from '../..';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CargarLanzamientos } from '../../reducers/lanzamientos/lanzamientos.actions';
import { CargarRuta } from 'src/app/reducers/rutas/rutas.actions';


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
  private nombreEstActual: string;

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
    // this.store.dispatch(new CargaEstado([this.idEstado]));
    this.store.dispatch(new CargarLanzamientos([this.idEstado, 2])); // Por defecto se ordena siempre Desc
  }

  private cargaObservables() {
    let _this = this;

    this.lanzamientos$ = this.store.select('lanzamientos').pipe(
      map(Lan => {
        if (Lan.cargados) {
          const idE = _this.idEstado;
          _this.estadoSel = idE;

          this.store.subscribe(
            st => {
              if (_this.nombreEstActual !== st.estados.nombre) {
                _this.nombreEstActual = st.estados.nombre;
                this.store.dispatch(
                        new CargarRuta([
                            `Estado:  ${_this.nombreEstActual} - Nº Lanzamientos: ${Lan.lanzamientos.length}`,
                            true, // ver boton volver
                            true, // ver botones fechas
                            _this.idEstado,
                            'Lanzamientos' ]));
              }
            }
          );

          return Lan.lanzamientos;
        }
      })
    );
  }
}
