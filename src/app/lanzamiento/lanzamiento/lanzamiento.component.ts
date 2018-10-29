import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { GlobalState } from '../..';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CargarLanzamiento } from '../../reducers/lanzamiento/lanzamiento.actions';
import { ActivatedRoute } from '@angular/router';
import { CargarRuta } from 'src/app/reducers/rutas/rutas.actions';

@Component({
  selector: 'app-lanzamiento',
  templateUrl: './lanzamiento.component.html',
  styleUrls: ['./lanzamiento.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanzamientoComponent implements OnInit {
  public lanzamiento$: Observable<any>;
  private idLanzamiento: number;
  private lanzamiento: any;

  constructor(
      private store: Store<GlobalState>,
      private activatedRoute: ActivatedRoute,
      ) { }

  ngOnInit() {
    console.log('Lanzamiento_ngOnInit');
    this.cargaObservables();
    this.cargaDatos();
  }

  private cargaDatos() {
    this.idLanzamiento = this.activatedRoute.snapshot.params['id'];
    this.store.dispatch(new CargarLanzamiento([this.idLanzamiento]));
  }

  private cargaObservables() {
    let _this = this;
    this.lanzamiento$ = this.store.select('lanzamiento').pipe(
      map(Lan => {
        if (Lan.cargado) {
          // Ya se que no es la solución más idónea (con más tiempo buscaría otra), pero si no se me quedaba bloqueado
          if (_this.lanzamiento === undefined ) {
            this.store.dispatch(new CargarRuta([`Lanzamiento  ${Lan.lanzamiento[0].name}` , true, false , 'Lanzamiento' ]));
          } else if ( _this.lanzamiento.id !== Lan.lanzamiento[0].id) {
            this.store.dispatch(new CargarRuta([`Lanzamiento  ${Lan.lanzamiento[0].name}` , true, false , 'Lanzamiento' ]));
          }
          _this.lanzamiento  = Lan.lanzamiento[0];
          return Lan.lanzamiento[0];
        }
      })
    );
  }
 }
