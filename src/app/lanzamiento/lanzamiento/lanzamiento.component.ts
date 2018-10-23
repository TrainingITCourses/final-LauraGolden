import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { GlobalState } from '../..';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CargarLanzamiento } from '../../reducers/lanzamiento/lanzamiento.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lanzamiento',
  templateUrl: './lanzamiento.component.html',
  styleUrls: ['./lanzamiento.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanzamientoComponent implements OnInit {
  public lanzamiento$: Observable<any>;
  private idLanzamiento: number;
  constructor(private store: Store<GlobalState>, private activatedRoute: ActivatedRoute) { }

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
    this.lanzamiento$ = this.store.select('lanzamiento').pipe(
      map(Lan => {
        if (Lan.cargado) {
          return Lan.lanzamiento;
        }
      })
    );
  }


}
