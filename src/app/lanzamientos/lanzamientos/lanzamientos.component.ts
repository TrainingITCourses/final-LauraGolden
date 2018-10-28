import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GlobalState } from '../..';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CargarLanzamientos } from '../../reducers/lanzamientos/lanzamientos.actions';
import { CargarRuta } from 'src/app/reducers/rutas/rutas.actions';
import { CargaEstado } from '../../reducers/estado/estado.actions';
import { LanzamientosEffects } from 'src/app/reducers/lanzamientos/lanzamientos.effects';


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

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<GlobalState>,
    private router: Router,
    private eLanzamientos: LanzamientosEffects,
  ) { }

  ngOnInit() {
    this.cargaObservables();
    this.cargaDatos();
  }

  private cargaDatos() {
    // Cogemos el id del estado para filtrar lanzamientos
    this.idEstado = this.activatedRoute.snapshot.params['id'];
    this.store.dispatch(new CargaEstado([this.idEstado]));
    this.store.dispatch(new CargarLanzamientos([this.idEstado, 2])); // Por defecto se ordena siempre Desc
    // this.store.dispatch(new CargarRuta(['Estado ' + this.idEstado , true, true, this.idEstado]));
    this.store.dispatch(new CargarRuta(['', true, true, this.idEstado]));
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


    // this.eLanzamientos.Carga$
    //     .subscribe(res  => {
    //       if (res.payload.length > 0) {
    //         this.store.dispatch(new CargaEstado([this.idEstado]));
    //       }
    //     });

    this.estado$ = this.store.select('estado').pipe(
      map(est => {
        if (est.cargado) {
          this.store.dispatch(new CargarRuta(['Estado: ' + est.estado[0].name, true, true, this.idEstado ]));
          return est.estado[0];
        }
      })
    );
  }
}
