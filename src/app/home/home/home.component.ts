import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { GlobalState } from '../..';
import { CargarEstados } from '../../reducers/estados/estados.actions';
import { CargarRuta } from '../../reducers/rutas/rutas.actions';
import { Ruta } from '../../interfaces/ruta';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  public estados$: Observable<any>;
  public informacion = { counter: 0, messaje: '' };
  public estados: any[];

  constructor(
      private store: Store<GlobalState>
      ) { }

  ngOnInit() {
    console.log('Home_ngOnInit');
    this.cargaObservables();
    this.cargaDatos();
  }

  private cargaDatos() {
    this.store.dispatch(new CargarEstados());
    const r: Ruta = {
      idRuta: 0,
      nombre: 'estados'
    };
    this.store.dispatch(new CargarRuta(r));
  }

  private cargaObservables() {
    this.store.select('estados').subscribe(est => {
      this.estados = est.estados;
      this.estados$ = this.store
        .select('estados')
        .pipe(
          map(est2 => {
            if (est2.cargados) {
              return est2.estados;
            }
          })
        );
    });
  }
}
