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
  private estadoSel: number;
  public estados$: Observable<any>;
  public estados: any[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<GlobalState>,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargaObservables();
    this.cargaDatos();
  }

  private cargaDatos() {
    // Cogemos el id del estado para filtrar lanzamientos
    this.idEstado = this.activatedRoute.snapshot.params['id'];
    this.store.dispatch(new CargarLanzamientos([this.idEstado]));
    this.store.dispatch(new CargarRuta('Estado: ' + this.idEstado ));
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

    this.store.select('estados').subscribe(est => {
      this.estados = est.estados;
      this.estados$ = this.store
        .select('estados')
        .pipe(
          map(est2 => {
            if (est2.cargados) {
              this.store.dispatch(new CargarRuta('Estado: ' + est2.estados[0].name ));
              return est2.estados;
            }
          })
        );
    });

  }

  onClickV($event) {
    this.router.navigate( ['/'] );
  }
  onClickFechaA() {
    console.log('Ordenar fecha Ascendiente (menos reciente)');
  }
  onClickFechaD() {
    console.log('Ordenar fecha descendiente (más reciente)');
  }
}
